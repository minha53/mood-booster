import { createBrowserRouter } from 'react-router';
import { MoodInput } from './pages/MoodInput';
import { MoodAnalysis } from './pages/MoodAnalysis';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MoodInput,
  },
  {
    path: '/analysis',
    Component: MoodAnalysis,
  },
]);
