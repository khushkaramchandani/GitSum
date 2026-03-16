import { FiAlertCircle } from 'react-icons/fi';
import './ErrorDisplay.css';

export default function ErrorDisplay({ error }) {
  if (!error) return null;

  let title = 'Something went wrong';
  let message = error;

  if (error.includes('404') || error.toLowerCase().includes('not found')) {
    title = 'User not found';
    message = `The GitHub username you entered doesn't exist. Please check the spelling and try again.`;
  } else if (error.includes('403') || error.toLowerCase().includes('rate limit')) {
    title = 'API Rate Limit Exceeded';
    message = 'GitHub API rate limit reached. Please wait a minute and try again, or use a GitHub token for higher limits.';
  } else if (error.toLowerCase().includes('network') || error.toLowerCase().includes('fetch')) {
    title = 'Network Error';
    message = 'Could not connect to the server. Please check your internet connection and try again.';
  }

  return (
    <div className="error-display" id="error-display">
      <div className="error-card">
        <div className="error-card__icon">
          <FiAlertCircle />
        </div>
        <div className="error-card__content">
          <div className="error-card__title">{title}</div>
          <p className="error-card__message">{message}</p>
        </div>
      </div>
    </div>
  );
}
