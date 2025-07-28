import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Heading } from './components/ui/Heading';
import { BlockCollapsing } from './features/blockCollapsing/BlockCollapsing';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col items-center justify-center gap-y-3 p-4">
        <Heading level={1}>ブロック崩れ</Heading>
        <Routes>
          <Route path="/" element={<BlockCollapsing />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
