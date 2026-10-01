'use client';

import { resumeData, atsKeywords } from '@/lib/resume-data';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

export default function Resume() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;

    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      pdf.save('Akshat_Kumar_Singh_Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-var(--bg-base) py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Download Buttons */}
        <div className="mb-6 flex gap-3">
          <button onClick={downloadPDF} className="btn btn-primary text-sm">
            ⬇️ Download PDF
          </button>
          <a
            href={`data:text/plain,${encodeURIComponent(generatePlainTextResume())}`}
            download="Akshat_Kumar_Singh_Resume.txt"
            className="btn btn-secondary text-sm"
          >
            📄 Text Export
          </a>
        </div>

        {/* Resume - Single Page */}
        <div
          ref={resumeRef}
          className="bg-white text-black p-6 space-y-2"
          style={{
            fontFamily: 'Calibri, Arial, sans-serif',
            fontSize: '10px',
            lineHeight: '1.25',
          }}
        >
          {/* Header */}
          <div className="border-b border-gray-800 pb-1.5">
            <h1 className="text-base font-bold">{resumeData.personal.name}</h1>
            <p className="text-xs font-semibold text-gray-700">{resumeData.personal.title}</p>
            <div className="flex flex-wrap gap-1.5 text-xs text-gray-600">
              <span>{resumeData.personal.email}</span>
              <span>•</span>
              <span>{resumeData.personal.phone}</span>
              <span>•</span>
              <span>{resumeData.personal.location}</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase">Summary</h2>
            <p className="text-xs text-gray-700 leading-tight">4+ years Frontend Engineer. Built WorkSyncX (React + Spring Boot). Expert in React.js, Next.js, TypeScript, real-time systems, and full-stack development.</p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase">Experience</h2>
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="text-xs">
                <div className="flex justify-between font-semibold">
                  <span>{exp.position} • {exp.company}</span>
                  <span>{exp.duration}</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-0">
                  {exp.achievements.slice(0, 2).map((a, i) => (
                    <li key={i}>{a.substring(0, 90)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Featured Project */}
          <div>
            <h2 className="text-xs font-bold uppercase">Featured Project</h2>
            {resumeData.projects[0] && (
              <div className="text-xs">
                <p className="font-semibold">{resumeData.projects[0].name}</p>
                <p className="text-gray-700">{resumeData.projects[0].description.substring(0, 140)}...</p>
                <p className="text-gray-600"><strong>Tech:</strong> {resumeData.projects[0].technologies.slice(0, 8).join(', ')}</p>
              </div>
            )}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase">Skills</h2>
            <p className="text-xs text-gray-700"><strong>Frontend:</strong> React.js, Next.js, TypeScript, Tailwind CSS</p>
            <p className="text-xs text-gray-700"><strong>Full-stack:</strong> Java, Spring Boot, Node.js, PostgreSQL, REST APIs, WebSockets</p>
            <p className="text-xs text-gray-700"><strong>Other:</strong> Git, Agile, WCAG AA, Design Systems</p>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase">Education</h2>
            <p className="text-xs text-gray-700"><strong>MCA</strong> Jain University (2023-2025) • <strong>BCA</strong> Invertis University (2019-2022)</p>
          </div>

          {/* Certs */}
          <div>
            <h2 className="text-xs font-bold uppercase">Certifications</h2>
            <p className="text-xs text-gray-700">Microsoft Azure AZ-900 (2024) • PWA Google Fundamentals (2023)</p>
          </div>

          {/* ATS Keywords */}
          <div className="text-xs opacity-0 h-0">
            {atsKeywords.hard_skills.join(' ')} {atsKeywords.soft_skills.join(' ')}
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 p-3 bg-var(--bg-sunken) rounded text-xs text-var(--text-secondary)">
          ✓ Single Page Resume • ✓ ATS Optimized • ✓ 4+ Years Experience • ✓ Featured: WorkSyncX
        </div>
      </div>
    </div>
  );
}

function generatePlainTextResume(): string {
  return `${resumeData.personal.name}
${resumeData.personal.title}
${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}

SUMMARY
4+ years Frontend Engineer. Built WorkSyncX (React + Spring Boot). Expert in React.js, Next.js, TypeScript, real-time systems, full-stack development (React + Java Spring Boot).

EXPERIENCE
${resumeData.experience.map((exp) => `${exp.position} | ${exp.company} | ${exp.duration}
${exp.achievements.slice(0, 2).map((a) => `• ${a}`).join('\n')}
Tech: ${exp.technologies.slice(0, 7).join(', ')}`).join('\n\n')}

FEATURED PROJECT
${resumeData.projects[0]?.name}
${resumeData.projects[0]?.description}
Tech: ${resumeData.projects[0]?.technologies.join(', ')}

SKILLS
Frontend: React.js, Next.js, TypeScript, Tailwind CSS, Web Components
Full-stack: Java, Spring Boot, Node.js, PostgreSQL, REST APIs, WebSockets
Other: Git, Agile, WCAG AA, Design Systems, Performance Optimization

EDUCATION
MCA - Jain University (2023-2025)
BCA - Invertis University (2019-2022)

CERTIFICATIONS
Microsoft Azure Fundamentals (AZ-900) - 2024
Progressive Web Apps (PWA) - Google - 2023`;
}
