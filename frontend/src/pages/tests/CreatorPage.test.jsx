import { render, screen } from '@testing-library/react';
import CreatorPage from './pages/CreatorPage';

test('renders CreatorPage dashboard', () => {
  // Create fake props
  const fakeUser = { username: 'TestUser' }; // just a fake user
  const fakeLogout = () => {}; // a fake logout function

  // Render the page
  render(<CreatorPage user={fakeUser} onLogout={fakeLogout} />);

  // Check if the dashboard text is visible
  const dashboardText = screen.getByText(/Welcome, TestUser/i);
  expect(dashboardText).toBeInTheDocument();
});
