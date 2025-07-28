export const HowToUse: React.FC = () => (
  <details>
    <summary className="cursor-pointer text-teal-400">
      説明をみる（クリックで展開）
    </summary>
    <fieldset>
      <p>
        <b>テキスト</b>
        に入力された文字数をリアルタイムにカウントするツールです。
        <br />
        カウントには、以下のルールを設定できます。
      </p>
      <h3>特殊文字のカウント設定</h3>
      <ul>
        <li>空白・改行をカウントするかの設定ができます</li>
      </ul>
      <h3>カウントしない文字</h3>
      <ul>
        <li>指定した文字はカウントされません</li>
      </ul>
      <h3>カウントしない行</h3>
      <ul>
        <li>指定した文字で始まる行はカウントされません</li>
      </ul>
    </fieldset>
  </details>
);
