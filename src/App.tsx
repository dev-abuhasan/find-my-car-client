import React from 'react';
import Loading from './components/ui-kits/loading/loading';
import Routings from './routes/route';
import { AppContext, } from './services/context/app-context';

const App: React.FC = () => {
  const { loading } = React.useContext(AppContext);

  return (
    <div>
      {loading && <Loading />}
      <Routings />
    </div>
  );
};

export default App;