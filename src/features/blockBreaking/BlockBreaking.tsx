import Matter, { type Body } from 'matter-js';
import { useEffect, useRef } from 'react';

const BALL_SPEEED = 5;

export const BlockBreaking = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(Matter.Runner.create());

  useEffect(() => {
    if (!sceneRef.current) {
      return;
    }

    const { Bodies, Body, Engine, Events, Render, Runner, World } = Matter;

    const engine = engineRef.current;
    const runner = runnerRef.current;

    // 無重力状態にする
    engine.gravity.x = 0;
    engine.gravity.y = 0.04;
    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: renderOptions,
    });

    // パドル
    const paddle = Bodies.rectangle(400, 550, 120, 20, paddleOptions);

    // ボール
    const ball = Bodies.circle(400, 300, 10, ballOptions);

    // 壁
    const walls = [
      Bodies.rectangle(400, 0, 800, 20, wallOptions),
      Bodies.rectangle(0, 300, 20, 600, wallOptions),
      Bodies.rectangle(800, 300, 20, 600, wallOptions),
    ];

    // ブロック
    const blocks = createBlocks();

    World.add(engine.world, [paddle, ball, ...walls, ...blocks]);

    // ボールの初速および方向を計算して設定
    const { x: initialVelocityX, y: initialVelocityY } =
      calculateRandomInitialVelocity(BALL_SPEEED);
    Body.setVelocity(ball, { x: initialVelocityX, y: initialVelocityY });

    // ブロックの衝突判定
    Events.on(engine, 'collisionStart', (event) => {
      for (const pair of event.pairs) {
        const { bodyA, bodyB } = pair;

        // ブロックが何かに触れたら静止状態を解除する
        if (isBlock(bodyA)) {
          Body.setStatic(bodyA, false);
        }
        if (isBlock(bodyB)) {
          Body.setStatic(bodyB, false);
        }
      }
    });

    // ボールの速度をバウンドの度に一定に保つ
    Events.on(engine, 'afterUpdate', () => {
      keepBallSpeed(ball);
    });

    // マウスイベントでパドルを操作する
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) {
        return;
      }

      const rect = sceneRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      Body.setPosition(paddle, { x: mouseX, y: 550 });
    };
    window.addEventListener('mousemove', handleMouseMove);

    Runner.run(runner, engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={sceneRef} />;
};

const isBlock = (body: Body) => body.label === 'block';

// 画面全体のフレーム設定
const renderOptions = {
  width: 800,
  height: 600,
  wireframes: false,
  background: '#444',
};
// 静的・跳ね返りMAX・摩擦なし
const staticBouncyOptions = {
  isStatic: true,
  restitution: 1,
  friction: 0,
  frictionAir: 0,
};
// 各種オブジェクトのレンダリングオプション
const wallOptions = {
  ...staticBouncyOptions,
  render: { fillStyle: '#89b' },
};
const blockOptions = {
  ...staticBouncyOptions,
  label: 'block',
  render: { fillStyle: '#ff0' },
};
const paddleOptions = {
  ...staticBouncyOptions,
  render: { fillStyle: '#0ff' },
};
const ballOptions = {
  isStatic: false,
  restitution: 1,
  friction: 0,
  frictionAir: 0,
  label: 'ball',
  render: { fillStyle: 'hotpink' },
};

/**
 * 指定された座標にブロックを作成する。
 * @param {number} x - ブロックの中心のX座標
 * @param {number} y - ブロックの中心のY座標
 * @param {number} [blockWidth=60] - ブロックの幅(デフォルト=60)
 * @param {number} [blockHeight=20] - ブロックの高さ(デフォルト=20)
 * @returns {Body} 作成されたMatter.jsのBodyオブジェクト
 */
const createBlock = (
  x: number,
  y: number,
  blockWidth = 60,
  blockHeight = 20,
): Body => {
  return Matter.Bodies.rectangle(x, y, blockWidth, blockHeight, blockOptions);
};

const GRID_CONFIG = {
  rows: 5,
  cols: 10,
  offsetX: 40,
  offsetY: 40,
  xSpacing: 80,
  ySpacing: 40,
} as const;

/**
 * 5行・10列のボックスを等間隔に作成して返却する。
 * @returns {Body[]} 作成されたボックスの配列
 */
const createBlocks = (): Body[] => {
  const blocks = [];

  for (let i = 0; i < GRID_CONFIG.rows; i++) {
    for (let j = 0; j < GRID_CONFIG.cols; j++) {
      const x = GRID_CONFIG.xSpacing * j + GRID_CONFIG.offsetX;
      const y = GRID_CONFIG.ySpacing * i + GRID_CONFIG.offsetY;
      blocks.push(createBlock(x, y));
    }
  }
  return blocks;
};

/**
 * 指定された速度で、ランダムな方向の初期速度ベクトルを計算する。
 * 真横や真上・真下など、ゲーム開始時に望ましくない方向への発射を避けるため、
 * X方向およびY方向の速度に最小値を保証する。
 *
 * @param {number} initialSpeed - ボールの初速
 * @returns { {x: number, y: number} } 計算されたXおよびY方向の速度成分を持つオブジェクト
 */
const calculateRandomInitialVelocity = (
  initialSpeed: number,
): { x: number; y: number } => {
  const randomAngle = Math.random() * Math.PI * 2; // 0から2π（360度）のランダムな角度
  let initialVelocityX = initialSpeed * Math.cos(randomAngle);
  let initialVelocityY = initialSpeed * Math.sin(randomAngle);

  // ボールが真横や真上・真下に飛ばないように速度を調整
  // 各方向の速度の最低絶対値
  const minAbsVelocityComponent = 2;

  // Y方向の速度が小さすぎたら調整
  if (Math.abs(initialVelocityY) < minAbsVelocityComponent) {
    // 符号を維持しつつ、最低速度を保証
    initialVelocityY =
      minAbsVelocityComponent * (initialVelocityY >= 0 ? 1 : -1);
  }
  // X方向の速度が小さすぎたら調整
  if (Math.abs(initialVelocityX) < minAbsVelocityComponent) {
    // 符号を維持しつつ、最低速度を保証
    initialVelocityX =
      minAbsVelocityComponent * (initialVelocityX >= 0 ? 1 : -1);
  }

  return { x: initialVelocityX, y: initialVelocityY };
};

/**
 * ボールの速度を一定に保つ。
 * @param {Body} ball - ボール
 */
const keepBallSpeed = (ball: Body) => {
  const { x, y } = ball.velocity;
  const magnitude = Math.sqrt(x ** 2 + y ** 2);

  // 速度が非常に小さい場合（ほぼ停止）
  if (magnitude < 0.1) {
    // ボールの速度がほぼゼロになったら、ターゲットスピードで再設定
    // 衝突などでボールが静止した場合にゲームが止まるのを防ぐ
    Matter.Body.setVelocity(ball, {
      x: BALL_SPEEED * (Math.random() > 0.5 ? 1 : -1),
      y: BALL_SPEEED * (Math.random() > 0.5 ? 1 : -1),
    });
    return;
  }

  const scale = BALL_SPEEED / magnitude;

  Matter.Body.setVelocity(ball, {
    x: x * scale,
    y: y * scale,
  });
};
