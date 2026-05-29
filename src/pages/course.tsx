import { useEffect, useState } from "react";
import API from "../api/axios";
import { theme } from "../theme/theme";
import { type Course, type Category } from "../types/course";
import { useNavigate } from "react-router-dom";

function Courses() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await API.get("/categories");
    setCategories(res.data);
  };

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchCourses();
  }, []);

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category?._id === selectedCategory);

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <span style={styles.smallHeading}>Courses</span>

        <h1 style={styles.title}>Choose Your Program</h1>

        <p style={styles.subtitle}>
          Select Sainik School preparation or academic classes and enroll
          according to your class.
        </p>
      </div>

      <div style={styles.categoryWrapper}>
        <button
          style={{
            ...styles.categoryButton,
            ...(selectedCategory === "all" ? styles.activeCategory : {})
          }}
          onClick={() => setSelectedCategory("all")}
        >
          All Courses
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            style={{
              ...styles.categoryButton,
              ...(selectedCategory === category._id ? styles.activeCategory : {})
            }}
            onClick={() => setSelectedCategory(category._id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div style={styles.grid}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.badge}>{course.category?.name}</span>

                <span style={styles.classBadge}>
                  Class {course.classLevel}
                </span>
              </div>

              <div style={styles.middleRow}>
                <div style={styles.courseIcon}>🎓</div>

                <div style={styles.featureBox}>
                  <div style={styles.featureItem}>📹 Recorded Lectures</div>
                  <div style={styles.featureItem}>📈 Progress Tracking</div>
                  <div style={styles.featureItem}>📝 Tests & Notes</div>
                  <div style={styles.featureItem}>👨‍🏫 Expert Guidance</div>
                </div>
              </div>

              <h2 style={styles.courseTitle}>{course.title}</h2>

              <p style={styles.description}>
                {course.description ||
                  "Complete course with expert guidance and recorded lectures."}
              </p>

              <div style={styles.divider}></div>

              <div style={styles.feeSection}>
                <span style={styles.feeLabel}>Monthly Fee</span>

                <h3 style={styles.fees}>₹{course.fees}</h3>

                <span style={styles.perMonth}>per month</span>
              </div>

              <button
  style={styles.button}
  onClick={() => navigate(`/courses/${course._id}`)}
>
  View Details
</button>
            </div>
          ))
        ) : (
          <p style={styles.noCourse}>No courses found in this category.</p>
        )}
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

  header: {
    textAlign: "center",
    marginBottom: "35px"
  },

  smallHeading: {
    color: theme.colors.primary,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
    fontSize: "14px"
  },

  title: {
    fontSize: "44px",
    color: theme.colors.dark,
    marginTop: "10px",
    marginBottom: "12px"
  },

  subtitle: {
    color: theme.colors.muted,
    fontSize: "17px",
    maxWidth: "650px",
    margin: "0 auto",
    lineHeight: "1.7"
  },

  categoryWrapper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "14px",
    marginBottom: "45px"
  },

  categoryButton: {
    padding: "12px 22px",
    borderRadius: "999px",
    border: `1px solid ${theme.colors.primary}`,
    backgroundColor: theme.colors.white,
    color: theme.colors.primary,
    fontWeight: 800,
    cursor: "pointer"
  },

  activeCategory: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    boxShadow: "0 10px 22px rgba(37, 99, 235, 0.25)"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(380px, 500px))",
    justifyContent: "center",
    gap: "30px"
  },

  card: {
    backgroundColor: theme.colors.white,
    padding: "24px",
    borderRadius: "22px",
    boxShadow: "0 14px 35px rgba(15, 23, 42, 0.09)",
    border: "1px solid #e2e8f0"
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
    gap: "10px"
  },

  badge: {
    backgroundColor: "#dbeafe",
    color: theme.colors.primary,
    padding: "7px 13px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 800
  },

  classBadge: {
    backgroundColor: "#ecfeff",
    color: "#0891b2",
    padding: "7px 13px",
    borderRadius: "999px",
    fontSize: "13px",
    fontWeight: 800
  },

  middleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "20px"
  },

  courseIcon: {
    width: "90px",
    height: "90px",
    borderRadius: "18px",
    backgroundColor: "#eff6ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "42px",
    flexShrink: 0
  },

  featureBox: {
    flex: 1,
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "15px"
  },

  featureItem: {
    padding: "6px 0",
    color: theme.colors.text,
    fontSize: "14px",
    fontWeight: 600
  },

  courseTitle: {
    color: theme.colors.dark,
    fontSize: "24px",
    marginTop: "0",
    marginBottom: "12px",
    lineHeight: "1.3"
  },

  description: {
    color: theme.colors.muted,
    lineHeight: "1.7",
    minHeight: "65px",
    marginBottom: "18px"
  },

  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "18px 0"
  },

  feeSection: {
    marginBottom: "22px"
  },

  feeLabel: {
    color: theme.colors.muted,
    fontSize: "14px",
    fontWeight: 600
  },

  fees: {
    color: theme.colors.secondary,
    fontSize: "36px",
    marginTop: "4px",
    marginBottom: "0",
    fontWeight: 900
  },

  perMonth: {
    color: theme.colors.muted,
    fontSize: "14px"
  },

  button: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    fontWeight: 800,
    fontSize: "15px",
    cursor: "pointer"
  },

  noCourse: {
    textAlign: "center",
    gridColumn: "1 / -1",
    color: theme.colors.muted,
    fontSize: "18px"
  }
};

export default Courses;