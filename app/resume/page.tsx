import type { Metadata } from 'next';
import ResumeView from './ResumeView';
import './resume.css';

export const metadata: Metadata = {
  title: 'Akshat Kumar Singh | Résumé',
  description: 'Résumé of Akshat Kumar Singh, frontend engineer at SparkTG. Download as a text PDF or plain text.',
};

export default function Resume() {
  return <ResumeView />;
}
