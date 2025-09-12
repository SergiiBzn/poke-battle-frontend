import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { BattleContext } from '../contexts/BattleContex';

function Result() {
  const navigate = useNavigate();
  const {
    score,
    allBattlesFinished,
    setAllBattlesFinished,
    resetBattleState,
    setOpenCard,
  } = useContext(BattleContext);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleClose = () => {
    setAllBattlesFinished(false);
    resetBattleState();
    setOpenCard(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault?.();
    if (!username?.trim() || submitting) return;
    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);
      const res = await fetch(`${API_BASE}/leaderboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), score }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Failed to submit score');
      }
      setSuccess(true);
      handleClose();
      navigate('/leaderboard');
    } catch (err) {
      setError(err?.message || 'Error while submitting score');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog className='modal' open={allBattlesFinished}>
      <div className='modal-box'>
        <h3 className='font-bold text-2xl text-center mb-4'>Battle Result</h3>
        <div className='text-center'>
          <p className='text-lg'>Your score</p>
          <p className='text-4xl font-extrabold text-amber-500'>{score}</p>
        </div>
        <form className='mt-6 space-y-3' onSubmit={handleSubmit}>
          <label className='form-control w-full'>
            <div className='label'>
              <span className='label-text'>Your name</span>
            </div>
            <input
              type='text'
              className='input input-bordered w-full'
              placeholder='Enter your name'
              maxLength={40}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {error && (
            <div className='text-red-600 text-sm' role='alert'>
              {error}
            </div>
          )}
          {success && (
            <div className='text-green-600 text-sm'>
              Score submitted! Check the leaderboard.
            </div>
          )}
          <div className='flex gap-2 justify-end pt-2'>
            <button
              type='submit'
              className={`btn btn-success ${submitting ? 'btn-disabled' : ''}`}
              disabled={submitting || !username.trim()}
            >
              {submitting ? 'Submitting...' : 'Submit score'}
            </button>
            <button type='button' className='btn' onClick={handleClose}>
              Close
            </button>
          </div>
        </form>
      </div>
      <form method='dialog' className='modal-backdrop' onClick={handleClose}>
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Result;
