import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../api/axios";
import { theme } from "../theme/theme";
import { type Course } from "../types/course";

function CourseDetails() {
  const { courseId } = useParams();

  const [course, setCourse] = useState<Course | null>(null);

  const fetchCourse = async () => {
    try {
      const res = await API.get(`/courses/${courseId}`);
      setCourse(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return (
      <div style={styles.loading}>
        Loading course details...
      </div>
    );
  }

  return (
    <section style={styles.page}>
      <div style={styles.container}>
        <div style={styles.left}>
          <span style={styles.badge}>
            {course.category?.name}
          </span>

          <h1 style={styles.title}>
            {course.title}
          </h1>

          <p style={styles.description}>
            {course.description ||
              "Complete course with expert guidance, recorded lectures, tests, and progress tracking."}
          </p>

          <div style={styles.features}>
            <div>📹 Recorded Lectures</div>
            <div>📝 Notes & Assignments</div>
            <div>📈 Progress Tracking</div>
            <div>🎯 Mock Tests</div>
            <div>👨‍🏫 Expert Guidance</div>
          </div>
        </div>

        <div style={styles.right}>
          <div style={styles.priceCard}>
            <h3 style={styles.classText}>
              Class {course.classLevel}
            </h3>

            <p style={styles.feeLabel}>
              Monthly Fee
            </p>

            <h2 style={styles.price}>
              ₹{course.fees}
            </h2>

            <p style={styles.month}>
              per month
            </p>

            <button style={styles.button}>
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "80vh",
    backgroundColor: theme.colors.light,
    padding: "70px 60px",
    fontFamily: theme.font.main
  },

  container: {
    maxWidth: "1150px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "40px"
  },

  left: {
    backgroundColor: theme.colors.white,
    padding: "45px",
    borderRadius: "24px",
    boxShadow: "0 14px 35px rgba(15, 23, 42, 0.08)"
  },

  right: {},

  badge: {
    backgroundColor: "#dbeafe",
    color: theme.colors.primary,
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: 800
  },

  title: {
    fontSize: "44px",
    color: theme.colors.dark,
    marginTop: "25px",
    marginBottom: "16px"
  },

  description: {
    color: theme.colors.muted,
    fontSize: "18px",
    lineHeight: "1.8"
  },

  features: {
    marginTop: "35px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    color: theme.colors.text,
    fontWeight: 700
  },

  priceCard: {
    backgroundColor: theme.colors.white,
    padding: "35px",
    borderRadius: "24px",
    boxShadow: "0 14px 35px rgba(15, 23, 42, 0.08)",
    position: "sticky",
    top: "30px"
  },

  classText: {
    color: theme.colors.dark,
    fontSize: "24px"
  },

  feeLabel: {
    color: theme.colors.muted,
    marginTop: "25px"
  },

  price: {
    color: theme.colors.secondary,
    fontSize: "48px",
    margin: "5px 0 0"
  },

  month: {
    color: theme.colors.muted
  },

  button: {
    width: "100%",
    padding: "15px",
    marginTop: "25px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontSize: "16px",
    fontWeight: 800,
    cursor: "pointer"
  },

  loading: {
    padding: "80px",
    textAlign: "center",
    fontSize: "20px"
  }
};

export default CourseDetails;