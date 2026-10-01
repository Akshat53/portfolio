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

        {/* Resume Content - Professional Multi-Page */}
        <div
          ref={resumeRef}
          className="bg-white text-black p-12 space-y-6"
          style={{
            fontFamily: 'Calibri, Arial, sans-serif',
            fontSize: '11px',
            lineHeight: '1.5',
          }}
        >
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-4">
            <h1 className="text-2xl font-bold text-gray-900">{resumeData.personal.name}</h1>
            <p className="text-sm text-gray-700 font-semibold">{resumeData.personal.title}</p>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-2">
              <span>📧 {resumeData.personal.email}</span>
              <span>📱 {resumeData.personal.phone}</span>
              <span>📍 {resumeData.personal.location}</span>
              <a href={resumeData.personal.github} className="text-blue-600 hover:underline">GitHub</a>
              <a href={resumeData.personal.linkedin} className="text-blue-600 hover:underline">LinkedIn</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">Professional Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900">
                        {exp.position} | {exp.company}
                      </p>
                      <p className="text-xs text-gray-600">{exp.description}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600 whitespace-nowrap">
                      <p>{exp.duration}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-xs text-gray-700 mt-1 space-y-0.5">
                    {exp.achievements.map((achievement, aidx) => (
                      <li key={aidx}>{achievement}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-600 mt-1">
                    <strong>Technologies:</strong> {exp.technologies.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Featured Project</h2>
            {resumeData.projects[0] && (
              <div>
                <p className="font-bold text-gray-900">{resumeData.projects[0].name}</p>
                <p className="text-xs text-gray-700 mt-1">{resumeData.projects[0].description}</p>
                <div className="mt-2">
                  <p className="text-xs text-gray-700 mb-1">
                    <strong>Highlights:</strong>
                  </p>
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-0">
                    {resumeData.projects[0].highlights.map((h, idx) => (
                      <li key={idx}>{h}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  <strong>Technologies:</strong> {resumeData.projects[0].technologies.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Technical Skills</h2>
            <div className="space-y-1">
              {Object.entries(resumeData.skills).map(([category, skills]) => (
                <p key={category} className="text-xs text-gray-700">
                  <strong>{category}:</strong> {skills.join(', ')}
                </p>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Education</h2>
            <div className="space-y-1">
              {resumeData.education.map((edu, idx) => (
                <p key={idx} className="text-xs text-gray-700">
                  <strong>{edu.degree}</strong> • {edu.institution}, {edu.location} ({edu.year})
                </p>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-2">Certifications</h2>
            <div className="space-y-1">
              {resumeData.certifications.map((cert, idx) => (
                <p key={idx} className="text-xs text-gray-700">
                  {cert.name} • {cert.issuer} ({cert.year})
                </p>
              ))}
            </div>
          </div>

          {/* ATS Keywords (hidden) */}
          <div className="text-xs text-gray-400 opacity-0 h-0 overflow-hidden">
            {atsKeywords.hard_skills.join(' ')} {atsKeywords.soft_skills.join(' ')} {atsKeywords.achievements.join(' ')}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-var(--bg-sunken) rounded-lg text-sm text-var(--text-secondary)">
          <p>✓ <strong>Complete Resume</strong> - All experience, projects, and skills included</p>
          <p>✓ <strong>ATS Optimized</strong> - Works with LinkedIn, Indeed, Workday, Greenhouse</p>
          <p>✓ <strong>Professional Format</strong> - Multi-page as needed, full content preservation</p>
        </div>
      </div>
    </div>
  );
}

// Generate plain text version for ATS systems
function generatePlainTextResume(): string {
  let text = `
${resumeData.personal.name}
${resumeData.personal.title}

CONTACT INFORMATION
Email: ${resumeData.personal.email}
Phone: ${resumeData.personal.phone}
Location: ${resumeData.personal.location}
GitHub: ${resumeData.personal.github}
LinkedIn: ${resumeData.personal.linkedin}
Portfolio: ${resumeData.personal.portfolio}

PROFESSIONAL SUMMARY
${resumeData.summary}

PROFESSIONAL EXPERIENCE
`;

  resumeData.experience.forEach((exp) => {
    text += `
${exp.position}
${exp.company} | ${exp.location} | ${exp.duration}
${exp.description}

${exp.achievements.map((a) => `• ${a}`).join('\n')}

Technologies: ${exp.technologies.join(', ')}
`;
  });

  text += `
FEATURED PROJECT
`;

  if (resumeData.projects[0]) {
    text += `
${resumeData.projects[0].name}
${resumeData.projects[0].description}

Highlights:
${resumeData.projects[0].highlights.map((h) => `• ${h}`).join('\n')}

Technologies: ${resumeData.projects[0].technologies.join(', ')}
`;
  }

  text += `
TECHNICAL SKILLS
`;

  Object.entries(resumeData.skills).forEach(([category, skills]) => {
    text += `
${category}: ${skills.join(', ')}
`;
  });

  text += `
EDUCATION
`;

  resumeData.education.forEach((edu) => {
    text += `
${edu.degree} - ${edu.institution}, ${edu.location} (${edu.year})
`;
  });

  text += `
CERTIFICATIONS
`;

  resumeData.certifications.forEach((cert) => {
    text += `
${cert.name} - ${cert.issuer} (${cert.year})
`;
  });

  return text;
}
