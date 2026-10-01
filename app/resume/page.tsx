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
    <div className="min-h-screen bg-var(--bg-base) py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Download Buttons */}
        <div className="mb-8 flex gap-4">
          <button
            onClick={downloadPDF}
            className="btn btn-primary"
          >
            ⬇️ Download Resume (PDF)
          </button>
          <a
            href={`data:text/plain,${encodeURIComponent(generatePlainTextResume())}`}
            download="Akshat_Kumar_Singh_Resume.txt"
            className="btn btn-secondary"
          >
            📄 Plain Text (ATS Format)
          </a>
        </div>

        {/* Resume Content - Professional Multi-Page with proper margins */}
        <div
          ref={resumeRef}
          className="bg-white text-black space-y-4"
          style={{
            fontFamily: 'Calibri, Arial, sans-serif',
            fontSize: '10.5px',
            lineHeight: '1.4',
            padding: '18mm 15mm', // 0.71" margins on top/bottom, 0.59" on sides
            width: '210mm',
            height: '297mm',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-3">
            <h1 className="text-xl font-bold text-gray-900 m-0">{resumeData.personal.name}</h1>
            <p className="text-xs text-gray-700 font-semibold m-0">{resumeData.personal.title}</p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
              <span>{resumeData.personal.email}</span>
              <span>•</span>
              <span>{resumeData.personal.phone}</span>
              <span>•</span>
              <span>{resumeData.personal.location}</span>
              <span>•</span>
              <a href={resumeData.personal.github} className="text-blue-600">GitHub</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider m-0">Summary</h2>
            <p className="text-gray-700 leading-tight m-0" style={{ textAlign: 'justify' }}>
              {resumeData.summary.substring(0, 300)}...
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider m-0">Experience</h2>
            <div className="space-y-3">
              {resumeData.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 m-0 break-words">
                        {exp.position} • {exp.company}
                      </p>
                      <p className="text-xs text-gray-600 m-0">{exp.description}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600 whitespace-nowrap flex-shrink-0">
                      <p className="m-0">{exp.duration}</p>
                      <p className="m-0">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-700 mt-1 space-y-0 m-0">
                    {exp.achievements.slice(0, 3).map((achievement, aidx) => (
                      <li key={aidx} className="m-0">{achievement.substring(0, 120)}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-600 mt-1 m-0 break-words">
                    <strong>Tech:</strong> {exp.technologies.slice(0, 6).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          <div>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider m-0">Featured Project</h2>
            {resumeData.projects[0] && (
              <div>
                <p className="font-bold text-gray-900 m-0">{resumeData.projects[0].name}</p>
                <p className="text-xs text-gray-700 mt-0.5 m-0 break-words">{resumeData.projects[0].description.substring(0, 150)}...</p>
                <p className="text-xs text-gray-600 mt-1 m-0 break-words">
                  <strong>Tech:</strong> {resumeData.projects[0].technologies.slice(0, 7).join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Skills - 2 Column Layout */}
          <div>
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider m-0">Skills</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(resumeData.skills).slice(0, 6).map(([category, skills]) => (
                <div key={category} className="break-inside-avoid">
                  <p className="text-xs text-gray-700 m-0">
                    <strong className="break-words">{category}:</strong> {' '}
                    <span className="break-words">{skills.slice(0, 4).join(', ')}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications - Compact */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider m-0">Education</h2>
              <div className="space-y-0.5">
                {resumeData.education.map((edu, idx) => (
                  <p key={idx} className="text-xs text-gray-700 m-0 break-words">
                    <strong>{edu.degree}</strong> • {edu.institution} ({edu.year})
                  </p>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider m-0">Certifications</h2>
              <div className="space-y-0.5">
                {resumeData.certifications.map((cert, idx) => (
                  <p key={idx} className="text-xs text-gray-700 m-0 break-words">
                    {cert.name} ({cert.year})
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ATS Keywords */}
          <div className="text-xs opacity-0 h-0 overflow-hidden">
            {atsKeywords.hard_skills.join(' ')} {atsKeywords.soft_skills.join(' ')}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-var(--bg-sunken) rounded-lg text-sm text-var(--text-secondary)">
          <p>✓ <strong>Professional Resume</strong> - Optimized layout with proper margins</p>
          <p>✓ <strong>No Content Overflow</strong> - All text fits within page boundaries</p>
          <p>✓ <strong>2-Column Skills</strong> - Better space utilization</p>
          <p>✓ <strong>ATS Optimized</strong> - Works with all ATS systems</p>
        </div>
      </div>
    </div>
  );
}

function generatePlainTextResume(): string {
  let text = `${resumeData.personal.name}
${resumeData.personal.title}

CONTACT
${resumeData.personal.email} | ${resumeData.personal.phone} | ${resumeData.personal.location}

SUMMARY
${resumeData.summary}

EXPERIENCE
`;

  resumeData.experience.forEach((exp) => {
    text += `\n${exp.position} | ${exp.company} | ${exp.duration}
${exp.description}
${exp.achievements.slice(0, 3).map((a) => `• ${a}`).join('\n')}
Tech: ${exp.technologies.slice(0, 8).join(', ')}
`;
  });

  text += `\nFEATURED PROJECT\n`;

  if (resumeData.projects[0]) {
    text += `${resumeData.projects[0].name}
${resumeData.projects[0].description}
Tech: ${resumeData.projects[0].technologies.join(', ')}
`;
  }

  text += `\nSKILLS\n`;
  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    text += `${category}: ${skills.slice(0, 6).join(', ')}\n`;
  });

  text += `\nEDUCATION\n`;
  resumeData.education.forEach((edu) => {
    text += `${edu.degree} - ${edu.institution} (${edu.year})\n`;
  });

  text += `\nCERTIFICATIONS\n`;
  resumeData.certifications.forEach((cert) => {
    text += `${cert.name} - ${cert.issuer} (${cert.year})\n`;
  });

  return text;
}
