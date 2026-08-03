// In sections/Projects.jsx
import defaultProjects from "../data/projects.json";

// In your useEffect:
const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

if (savedProjects.length > 0) {
  const published = savedProjects.filter(
    (project) => project.status === "Published"
  );
  setProjects(published);
} else {
  setProjects(defaultProjects.filter(p => p.status === "Published"));
}