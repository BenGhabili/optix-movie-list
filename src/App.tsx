import React from 'react';
import { DataProvider } from './context/DataContext';
import { MovieProvider } from './context/MovieContext';
import ErrorBoundary from './Components/ErrorHandling/ErrorBoundry';
import ErrorPage from './Components/ErrorHandling/ErrorPage';
import Movies from './Containers/Movies';

const App = () =>  {
  return (
    <ErrorBoundary ErrorPage={ErrorPage} >
      <DataProvider>
        <MovieProvider>
          <Movies />
        </MovieProvider>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
