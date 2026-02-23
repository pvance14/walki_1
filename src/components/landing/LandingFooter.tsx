import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';

export const LandingFooter = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Ready to find your motivation persona?</h2>
            <p className="mt-2 text-sm text-slate-300">
              Take the quiz and get matched in under two minutes.
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            className="w-full bg-white transition-all duration-200 hover:bg-slate-100 active:scale-[0.99] sm:w-auto"
            onClick={() => navigate('/quiz')}
          >
            Find Your Persona
          </Button>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-700 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex items-center gap-5" aria-label="Legal links">
            <a
              className="inline-flex min-h-11 items-center text-slate-300 transition-colors duration-200 hover:text-white"
              href="/terms-of-service"
            >
              Terms of Service
            </a>
            <a
              className="inline-flex min-h-11 items-center text-slate-300 transition-colors duration-200 hover:text-white"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
          </nav>
          <p className="text-slate-400">© {currentYear} Walki. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
