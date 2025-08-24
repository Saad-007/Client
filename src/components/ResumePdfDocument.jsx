// ===== File: src/components/ResumePdfDocument.jsx =====
// A PDF-only layout that mirrors your on-screen data without depending on Tailwind.
// This avoids html2canvas quirks and produces crisp, consistent PDFs.

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Optional: register a font (uncomment and provide URLs if you want Inter or others)
// Font.register({ family: 'Inter', fonts: [
//   { src: '/fonts/Inter-Regular.ttf' },
//   { src: '/fonts/Inter-Bold.ttf', fontWeight: 'bold' },
// ]});

const ResumePdfDocument = ({ resume = {}, templateStyles = {}, templateName = "professional" }) => {
  const {
    primaryColor = "#2563eb",
    secondaryColor = "#1e40af",
    backgroundColor = "#ffffff",
    textColor = "#111827",
    accentColor = "#e5e7eb",
    headerStyle = "solid",
  } = templateStyles || {};

  const safe = (v, fallback = "") => (Array.isArray(v) ? v : v || fallback);

  const styles = StyleSheet.create({
    page: {
      padding: 28,
      backgroundColor: backgroundColor,
      color: textColor,
      fontSize: 10,
      fontFamily: 'Helvetica', // change to 'Inter' if registered
    },
    header: {
      marginBottom: 12,
      paddingBottom: 8,
      borderBottomWidth: headerStyle === 'minimal' ? 0.5 : 0,
      borderBottomColor: accentColor,
    },
    headerBar: {
      height: headerStyle === 'gradient' || headerStyle === 'creative' ? 8 : 0,
      backgroundColor: primaryColor,
      marginBottom: headerStyle === 'gradient' || headerStyle === 'creative' ? 10 : 0,
    },
    name: {
      fontSize: 18,
      fontWeight: 700,
    },
    contact: {
      marginTop: 3,
      fontSize: 10,
      color: '#4b5563',
    },
    section: {
      marginTop: 12,
    },
    sectionHeader: {
      fontSize: 12,
      fontWeight: 700,
      marginBottom: 6,
      color: primaryColor,
    },
    item: { marginBottom: 6 },
    role: { fontSize: 11, fontWeight: 700 },
    bullet: { marginLeft: 8, marginTop: 2 },
    pillWrap: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    pill: {
      fontSize: 9,
      paddingVertical: 3,
      paddingHorizontal: 6,
      backgroundColor: accentColor,
      color: textColor,
      borderRadius: 4,
      marginRight: 4,
      marginBottom: 4,
    },
    twoCol: {
      display: 'flex',
      flexDirection: 'row',
      gap: 16,
    },
    col: { flex: 1 },
  });

  const Experience = ({ list = [] }) => (
    <View style={styles.section} wrap>
      <Text style={styles.sectionHeader}>Experience</Text>
      {list.map((exp, i) => (
        <View key={i} style={styles.item} wrap>
          <Text style={styles.role}>
            {(exp.title || exp.position || "").toString()} {(exp.company ? `• ${exp.company}` : "")}
          </Text>
          {exp.location || exp.date ? (
            <Text style={{ color: '#6b7280', fontSize: 9 }}>
              {[exp.location, exp.date || exp.period].filter(Boolean).join(' • ')}
            </Text>
          ) : null}
          {Array.isArray(exp.bullets) ? (
            <View style={{ marginTop: 3 }}>
              {exp.bullets.map((b, bi) => (
                <Text key={bi} style={styles.bullet}>• {b}</Text>
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );

  const Education = ({ list = [] }) => (
    <View style={styles.section} wrap>
      <Text style={styles.sectionHeader}>Education</Text>
      {list.map((ed, i) => (
        <View key={i} style={styles.item} wrap>
          <Text style={styles.role}>
            {(ed.degree || ed.title || "").toString()} {(ed.school ? `• ${ed.school}` : "")}
          </Text>
          {ed.location || ed.date ? (
            <Text style={{ color: '#6b7280', fontSize: 9 }}>
              {[ed.location, ed.date || ed.period].filter(Boolean).join(' • ')}
            </Text>
          ) : null}
          {ed.details ? <Text style={{ marginTop: 2 }}>{ed.details}</Text> : null}
        </View>
      ))}
    </View>
  );

  const ListPills = ({ title, items = [] }) => (
    <View style={styles.section} wrap>
      <Text style={styles.sectionHeader}>{title}</Text>
      <View style={styles.pillWrap}>
        {items.filter(Boolean).map((s, i) => (
          <Text key={i} style={styles.pill}>{s}</Text>
        ))}
      </View>
    </View>
  );

  const Projects = ({ list = [] }) => (
    <View style={styles.section} wrap>
      <Text style={styles.sectionHeader}>Projects</Text>
      {list.map((p, i) => (
        <View key={i} style={styles.item} wrap>
          <Text style={styles.role}>{p.name || p.title}</Text>
          {p.description ? <Text style={{ marginTop: 2 }}>{p.description}</Text> : null}
          {Array.isArray(p.highlights) && p.highlights.length ? (
            <View style={{ marginTop: 3 }}>
              {p.highlights.map((h, hi) => (
                <Text key={hi} style={styles.bullet}>• {h}</Text>
              ))}
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );

  const Certifications = ({ list = [] }) => (
    <View style={styles.section} wrap>
      <Text style={styles.sectionHeader}>Certifications</Text>
      {list.map((c, i) => (
        <Text key={i} style={{ marginBottom: 4 }}>• {c.name || c}</Text>
      ))}
    </View>
  );

  const Languages = ({ list = [] }) => (
    <View style={styles.section} wrap>
      <Text style={styles.sectionHeader}>Languages</Text>
      <View style={styles.pillWrap}>
        {list.map((l, i) => (
          <Text key={i} style={styles.pill}>{l.name || l}</Text>
        ))}
      </View>
    </View>
  );

  return (
    <Document title={`${(resume.name || 'Resume')}-Resume`}>
      <Page size="A4" style={styles.page} wrap>
        {/* Header bar for gradient/creative variants */}
        {headerStyle !== 'solid' && <View style={styles.headerBar} />}

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{resume.name || 'John Doe'}</Text>
          {resume.contactInfo ? (
            <Text style={styles.contact}>{resume.contactInfo}</Text>
          ) : null}
          {resume.summary ? (
            <Text style={{ marginTop: 6 }}>{resume.summary}</Text>
          ) : null}
        </View>

        {/* Two-column layout: Experience + Skills/Education */}
        <View style={styles.twoCol} wrap>
          <View style={styles.col}>
            {Array.isArray(resume.experience) && resume.experience.length > 0 ? (
              <Experience list={safe(resume.experience)} />
            ) : null}

            {Array.isArray(resume.projects) && resume.projects.length > 0 ? (
              <Projects list={safe(resume.projects)} />
            ) : null}
          </View>

          <View style={styles.col}>
            {Array.isArray(resume.skills) && resume.skills.length > 0 ? (
              <ListPills title="Skills" items={safe(resume.skills)} />
            ) : null}

            {Array.isArray(resume.education) && resume.education.length > 0 ? (
              <Education list={safe(resume.education)} />
            ) : null}

            {Array.isArray(resume.certifications) && resume.certifications.length > 0 ? (
              <Certifications list={safe(resume.certifications)} />
            ) : null}

            {Array.isArray(resume.languages) && resume.languages.length > 0 ? (
              <Languages list={safe(resume.languages)} />
            ) : null}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePdfDocument;
