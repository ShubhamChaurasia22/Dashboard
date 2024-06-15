import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Table from "./components/table/Table";
import TableauView from "./components/charts/TableauView";
import PieChartComponent from "./components/charts/PieChartComponent";
import GraphChart from "./components/charts/GraphChart";
import FormComponent from './components/form/FormComponent';
import { Provider } from 'react-redux';
import { store } from './components/store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { path: '/', element: <Table />},
    { path: '/pie-chart', element: <PieChartComponent />},
    { path: '/graph-chart', element: <GraphChart />},
    { path: '/tableau-view', element: <TableauView />},
    // { path: '/form', element: <FormComponent />},
  ]},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
