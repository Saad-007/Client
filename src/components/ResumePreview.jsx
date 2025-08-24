import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { forwardRef } from 'react';

const ResumePreview = forwardRef(({ resume, template = 'professional', templateStyles, forPDF = false }, ref) => {
  // Define default template styles if not provided
  const styles = templateStyles || {
    professional: {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      backgroundColor: '#ffffff',
      textColor: '#374151',
      accentColor: '#dbeafe'
    },
    modern: {
      primaryColor: '#7c3aed',
      secondaryColor: '#5b21b6',
      backgroundColor: '#f9fafb',
      textColor: '#1f2937',
      accentColor: '#ede9fe'
    },
    minimalist: {
      primaryColor: '#000000',
      secondaryColor: '#4b5563',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      accentColor: '#f3f4f6'
    },
    creative: {
      primaryColor: '#db2777',
      secondaryColor: '#9d174d',
      backgroundColor: '#fdf2f8',
      textColor: '#4b5563',
      accentColor: '#fce7f3'
    }
  }[template];

  // Apply template styles as CSS variables
  const style = {
    '--primary-color': styles.primaryColor,
    '--secondary-color': styles.secondaryColor,
    '--bg-color': styles.backgroundColor,
    '--text-color': styles.textColor,
    '--accent-color': styles.accentColor,
  };

  // For PDF, use fixed sizes instead of responsive classes
  const getSizeClass = (mobile, desktop) => forPDF ? desktop : mobile;

  if (!resume) {
    return (
      <div 
        className={`bg-gradient-to-br from-gray-50 to-gray-100 ${getSizeClass('p-4', 'p-6')} ${getSizeClass('rounded-xl', 'rounded-2xl')} border border-gray-200 shadow-sm`}
        style={style}
      >
        <div className="text-center space-y-2">
          <div className={`inline-flex items-center justify-center ${getSizeClass('w-10 h-10', 'w-12 h-12')} bg-white rounded-full shadow-inner border border-gray-200 mb-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${getSizeClass('h-4 w-4', 'h-5 w-5')} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className={`${getSizeClass('text-sm', 'text-base')} font-medium text-gray-700`}>Your professional resume</h3>
          <p className="text-gray-500 text-xs max-w-md mx-auto">Your beautifully formatted resume will appear here once generated.</p>
        </div>
      </div>
    );
  }

  // Template-specific components
  const getComponents = () => {
    const base = {
      h1: ({ node, ...props }) => (
        <h1 
          className={`${getSizeClass('text-xl', 'text-2xl')} font-bold text-center mb-2`}
          style={{
            background: template === 'minimalist' 
              ? 'none' 
              : `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
            color: template === 'minimalist' ? 'var(--text-color)' : 'transparent',
            WebkitBackgroundClip: template === 'minimalist' ? 'unset' : 'text',
            backgroundClip: template === 'minimalist' ? 'unset' : 'text',
          }}
          {...props} 
        />
      ),
      h2: ({ node, ...props }) => (
        <h2 
          className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mt-4', 'mt-6')} ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`} 
          style={{ color: 'var(--text-color)' }}
          {...props}
        >
          {template !== 'minimalist' && (
            <span 
              className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
              style={{ backgroundColor: 'var(--primary-color)' }}
            ></span>
          )}
          <span>{props.children}</span>
        </h2>
      ),
      h3: ({ node, ...props }) => (
        <h3 
          className={`${getSizeClass('text-sm', 'text-base')} font-medium ${getSizeClass('mt-3', 'mt-4')} ${getSizeClass('mb-1', 'mb-1.5')} flex items-center`} 
          style={{ color: 'var(--text-color)' }}
          {...props}
        >
          <span 
            className="w-1.5 h-1.5 rounded-full mr-2"
            style={{ backgroundColor: 'var(--primary-color)' }}
          ></span>
          <span>{props.children}</span>
        </h3>
      ),
      p: ({ node, ...props }) => (
        <p 
          className={`${getSizeClass('my-2', 'my-3')} leading-relaxed ${getSizeClass('text-xs', 'text-sm')}`} 
          style={{ color: 'var(--text-color)' }}
          {...props} 
        />
      ),
      ul: ({ node, ...props }) => (
        <ul className={`${getSizeClass('space-y-1', 'space-y-1.5')} ${getSizeClass('my-1', 'my-2')}`} {...props} />
      ),
      li: ({ node, ...props }) => (
        <li 
          className={`leading-snug flex items-start ${getSizeClass('text-xs', 'text-sm')}`} 
          style={{ color: 'var(--text-color)' }}
          {...props}
        >
          <span 
            className={`inline-flex items-center justify-center ${getSizeClass('h-3 w-3', 'h-4 w-4')} rounded-full mr-1.5 mt-0.5 text-xs flex-shrink-0`}
            style={{ 
              backgroundColor: 'var(--accent-color)',
              color: 'var(--primary-color)'
            }}
          >
            {template === 'creative' ? '✓' : '•'}
          </span>
          <span>{props.children}</span>
        </li>
      ),
      strong: ({ node, ...props }) => (
        <strong 
          className="font-semibold" 
          style={{ color: 'var(--text-color)' }}
          {...props} 
        />
      ),
      a: ({ node, ...props }) => (
        <a 
          className={`underline underline-offset-2 ${getSizeClass('text-xs', 'text-sm')}`} 
          style={{ color: 'var(--primary-color)' }}
          {...props} 
        />
      ),
      div: ({ node, className, ...props }) => (
        <div 
          className={`${className} text-center ${getSizeClass('mb-2', 'mb-3')} text-xs`}
          style={{ color: 'var(--text-color)' }}
          {...props} 
        />
      )
    };

    // Template-specific overrides
    if (template === 'professional') {
      base.h1 = ({ node, ...props }) => (
        <h1 
          className={`${getSizeClass('text-xl', 'text-2xl')} font-bold text-center mb-2 uppercase tracking-wider`}
          style={{
            color: 'var(--primary-color)',
            letterSpacing: '0.1em'
          }}
          {...props} 
        />
      );
    }

    if (template === 'creative') {
      base.h2 = ({ node, ...props }) => (
        <h2 
          className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mt-4', 'mt-6')} ${getSizeClass('mb-2', 'mb-3')} pb-1 flex items-center`}
          style={{ 
            color: 'var(--primary-color)',
            borderBottom: '2px dashed var(--accent-color)'
          }}
          {...props}
        >
          <span 
            className={`${getSizeClass('w-2.5 h-2.5', 'w-3 h-3')} rounded-full mr-2`}
            style={{ 
              backgroundColor: 'var(--primary-color)',
              opacity: 0.7
            }}
          ></span>
          <span>{props.children}</span>
        </h2>
      );
    }

    return base;
  };

  const markdownComponents = getComponents();

  // Handle markdown cases
  if (typeof resume === 'string') {
    return (
      <div 
        ref={ref} 
        className={`${getSizeClass('p-4', 'p-6')} ${getSizeClass('rounded-xl', 'rounded-2xl')} shadow-lg border border-gray-200`}
        style={{
          ...style,
          backgroundColor: 'var(--bg-color)',
          width: forPDF ? '210mm' : '100%',
          maxWidth: forPDF ? '210mm' : '100%',
          minHeight: forPDF ? '297mm' : 'auto'
        }}
      >
        <div className="prose max-w-none prose-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {resume}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  // Handle structured resume object
  if (typeof resume === 'object' && !Array.isArray(resume)) {
    const {
      name = '',
      contactInfo = '',
      summary = '',
      skills = [],
      certifications = [],
      tools = [],
      languages = [],
      experience = [],
      education = [],
      projects = []
    } = resume;

    const toArray = (val) => {
      if (Array.isArray(val)) return val.filter(Boolean);
      if (typeof val === 'string') return val.split(/,\s*|\n+/).map(s => s.trim()).filter(Boolean);
      return [];
    };

    const normalizeListBlocks = (val) => {
      if (Array.isArray(val)) {
        return val.map((v) => {
          if (typeof v === 'string') return v;
          if (v && typeof v === 'object') {
            const { institution, degree, year, title, description } = v;
            return (
              [title, description].filter(Boolean).join(' — ') ||
              [degree, institution, year].filter(Boolean).join(' — ')
            );
          }
          return '';
        }).filter(Boolean);
      }
      if (typeof val === 'string') {
        return val.split('\n').map(s => s.trim()).filter(Boolean);
      }
      return [];
    };

    // Process experience
    const experienceBlocks = Array.isArray(experience)
      ? experience.map((e) => ({
          title: [e.role, e.company].filter(Boolean).join(' @ '),
          bullets: Array.isArray(e.bullets) 
            ? e.bullets.filter(Boolean) 
            : toArray(e.bullets)
        }))
      : [];

    const skillsArray = toArray(skills);
    const certificationsArray = toArray(certifications);
    const educationList = normalizeListBlocks(education);
    const projectsList = normalizeListBlocks(projects);
    const languagesArray = toArray(languages);
    const toolsArray = toArray(tools);

    return (
      <div 
        ref={ref} 
        className={`${getSizeClass('p-4', 'p-6')} ${getSizeClass('rounded-xl', 'rounded-2xl')} shadow-lg border border-gray-200 print:p-6 print:rounded-none print:shadow-none`}
        style={{
          ...style,
          width: forPDF ? '210mm' : '100%',
          maxWidth: forPDF ? '210mm' : '100%',
          minHeight: forPDF ? '297mm' : 'auto',
          backgroundColor: 'var(--bg-color)'
        }}
      >
        {/* Header */}
        {(name || contactInfo) && (
          <header className={`text-center ${getSizeClass('mb-4', 'mb-6')}`}>
            {name && (
              <h1 
                className={`${getSizeClass('text-xl', 'text-2xl')} font-bold mb-1.5`}
                style={{
                  color: 'var(--primary-color)',
                  background: 'none',
                  WebkitBackgroundClip: 'unset',
                  backgroundClip: 'unset',
                }}
              >
                {name}
              </h1>
            )}
            {contactInfo && (
              <div className={`flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs`}>
                {contactInfo.split(/[,;]|\n/).map((info, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center"
                    style={{ color: 'var(--text-color)' }}
                  >
                    <svg 
                      className={`${getSizeClass('w-3 h-3', 'w-3.5 h-3.5')} mr-1`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {info.trim()}
                  </span>
                ))}
              </div>
            )}
          </header>
        )}

        {/* Education */}
        {!!educationList.length && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Education</span>
            </h2>
            <ul className={`space-y-2 ${getSizeClass('pl-3', 'pl-4')}`}>
              {educationList.map((edu, i) => {
                let degreeAbbr = '';
                let institution = '';
                let year = '';
                
                if (typeof edu === 'string') {
                  const parts = edu.split(' — ');
                  if (parts.length >= 3) {
                    const degreeParts = parts[0].split(' ');
                    degreeAbbr = degreeParts.map(p => p[0]).join('').toUpperCase();
                    institution = parts[1];
                    year = parts[2];
                  } else if (parts.length === 2) {
                    const degreeParts = parts[0].split(' ');
                    degreeAbbr = degreeParts.map(p => p[0]).join('').toUpperCase();
                    institution = parts[1];
                  }
                } else if (typeof edu === 'object') {
                  const { degree, institution: inst, year: yr } = edu;
                  const degreeParts = degree?.split(' ') || [];
                  degreeAbbr = degreeParts.map(p => p[0]).join('').toUpperCase();
                  institution = inst || '';
                  year = yr || '';
                }

                return (
                  <li 
                    key={i} 
                    className={`${getSizeClass('pl-3', 'pl-4')} border-l-2 py-1 ${getSizeClass('text-xs', 'text-sm')}`}
                    style={{ 
                      color: 'var(--text-color)',
                      borderColor: 'var(--accent-color)'
                    }}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                      <div className="flex items-start">
                        <svg 
                          className={`${getSizeClass('w-3 h-3', 'w-3.5 h-3.5')} mr-1.5 mt-0.5 flex-shrink-0`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          style={{ color: 'var(--primary-color)' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <span className="font-medium">{degreeAbbr}</span>
                          {institution && (
                            <span style={{ color: 'var(--text-color)' }}> • {institution}</span>
                          )}
                        </div>
                      </div>
                      {year && (
                        <span className={`text-xs ${getSizeClass('mt-1 md:mt-0', 'md:mt-0')} ${getSizeClass('md:ml-2', 'md:ml-2')}`} style={{ color: 'var(--text-color)' }}>{year}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Summary */}
        {summary && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Professional Summary</span>
            </h2>
            <p 
              className={`leading-relaxed ${getSizeClass('pl-3', 'pl-4')} ${getSizeClass('text-xs', 'text-sm')}`}
              style={{ color: 'var(--text-color)' }}
            >
              {summary}
            </p>
          </section>
        )}

        {/* Skills */}
        {skillsArray.length > 0 && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Technical Skills</span>
            </h2>
            <div className={`flex flex-wrap ${getSizeClass('gap-1', 'gap-1.5')} ${getSizeClass('pl-3', 'pl-4')}`}>
              {skillsArray.map((skill, i) => (
                <span 
                  key={i} 
                  className={`inline-flex items-center ${getSizeClass('px-1.5 py-0.5', 'px-2 py-0.5')} rounded-full text-xs font-medium`}
                  style={{ 
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--primary-color)'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experienceBlocks.length > 0 && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Professional Experience</span>
            </h2>
            <div className={`${getSizeClass('space-y-3', 'space-y-4')} ${getSizeClass('pl-3', 'pl-4')}`}>
              {experienceBlocks.map((exp, idx) => (
                <div 
                  key={idx} 
                  className={`relative ${getSizeClass('pl-4', 'pl-5')}`}
                  style={{ color: 'var(--text-color)' }}
                >
                  {template !== 'minimalist' && (
                    <div 
                      className={`absolute left-0 ${getSizeClass('top-1', 'top-1.5')} ${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full opacity-80`}
                      style={{ backgroundColor: 'var(--primary-color)' }}
                    ></div>
                  )}
                  {exp.title && (
                    <h3 className={`${getSizeClass('text-sm', 'text-base')} font-medium mb-1`}>
                      {exp.title}
                    </h3>
                  )}
                  {exp.bullets?.length > 0 && (
                    <ul className={getSizeClass('space-y-1', 'space-y-1.5')}>
                      {exp.bullets.map((point, i) => (
                        <li key={i} className={`flex ${getSizeClass('text-xs', 'text-sm')}`}>
                          <span 
                            className={`inline-flex items-center justify-center ${getSizeClass('h-3 w-3', 'h-4 w-4')} rounded-full mr-1.5 mt-0.5 text-xs flex-shrink-0`}
                            style={{ 
                              backgroundColor: 'var(--accent-color)',
                              color: 'var(--primary-color)'
                            }}
                          >
                            {template === 'creative' ? '✓' : '•'}
                          </span>
                          <span>{String(point).replace(/^•\s*/, '').trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projectsList.length > 0 && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Key Projects</span>
            </h2>
            <ul className={`grid grid-cols-1 ${getSizeClass('gap-2', 'gap-3')} ${getSizeClass('pl-3', 'pl-4')}`}>
              {projectsList.map((proj, i) => (
                <li 
                  key={i} 
                  className={`rounded ${getSizeClass('p-2', 'p-3')} border border-gray-200 ${getSizeClass('text-xs', 'text-sm')}`}
                  style={{ backgroundColor: 'var(--accent-color)' }}
                >
                  <div className="flex items-start">
                    <svg 
                      className={`${getSizeClass('w-3 h-3', 'w-3.5 h-3.5')} mr-1.5 mt-0.5 flex-shrink-0`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span style={{ color: 'var(--text-color)' }}>{proj}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Certifications */}
        {certificationsArray.length > 0 && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Certifications</span>
            </h2>
            <ul className={`${getSizeClass('space-y-1', 'space-y-2')} ${getSizeClass('pl-3', 'pl-4')}`}>
              {certificationsArray.map((cert, i) => (
                <li 
                  key={i} 
                  className={`flex items-start ${getSizeClass('text-xs', 'text-sm')}`}
                  style={{ color: 'var(--text-color)' }}
                >
                  <svg 
                    className={`${getSizeClass('w-3 h-3', 'w-3.5 h-3.5')} mr-1.5 mt-0.5 flex-shrink-0`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Languages */}
        {languagesArray.length > 0 && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Languages</span>
            </h2>
            <div className={`flex flex-wrap ${getSizeClass('gap-1', 'gap-1.5')} ${getSizeClass('pl-3', 'pl-4')}`}>
              {languagesArray.map((lang, i) => (
                <span 
                  key={i} 
                  className={`inline-flex items-center ${getSizeClass('px-1.5 py-0.5', 'px-2 py-0.5')} rounded-full text-xs font-medium`}
                  style={{ 
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--text-color)'
                  }}
                >
                  <svg 
                    className={`${getSizeClass('w-3 h-3', 'w-3.5 h-3.5')} mr-1`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Tools */}
        {toolsArray.length > 0 && (
          <section className={getSizeClass('mb-4', 'mb-6')}>
            <h2 className={`${getSizeClass('text-base', 'text-lg')} font-semibold ${getSizeClass('mb-2', 'mb-3')} pb-1 border-b border-gray-200 flex items-center`}>
              {template !== 'minimalist' && (
                <span 
                  className={`${getSizeClass('w-2 h-2', 'w-2.5 h-2.5')} rounded-full mr-2`}
                  style={{ backgroundColor: 'var(--primary-color)' }}
                ></span>
              )}
              <span style={{ color: 'var(--text-color)' }}>Tools</span>
            </h2>
            <div className={`flex flex-wrap ${getSizeClass('gap-1', 'gap-1.5')} ${getSizeClass('pl-3', 'pl-4')}`}>
              {toolsArray.map((lang, i) => (
                <span 
                  key={i} 
                  className={`inline-flex items-center ${getSizeClass('px-1.5 py-0.5', 'px-2 py-0.5')} rounded-full text-xs font-medium`}
                  style={{ 
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--text-color)'
                  }}
                >
                  <svg 
                    className={`${getSizeClass('w-3 h-3', 'w-3.5 h-3.5')} mr-1`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  {lang}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div 
      className={`bg-white ${getSizeClass('p-4', 'p-6')} ${getSizeClass('rounded-xl', 'rounded-2xl')} shadow-lg border border-gray-200 text-center`}
      style={style}
    >
      <div className="text-red-500 mb-2 text-xs md:text-sm">Unable to display resume</div>
      <div className="text-gray-600 text-xs">The resume data is in an unexpected format.</div>
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';
export default ResumePreview;