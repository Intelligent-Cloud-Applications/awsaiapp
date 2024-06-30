import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../services/AsanaService';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const cachedProjects = localStorage.getItem('projectsCache');
                if (cachedProjects) {
                    setProjects(JSON.parse(cachedProjects));
                }
                else{
                    setLoading(true);
                    const projectsData = await fetchProjects();
                    setProjects(projectsData);
                    localStorage.setItem('projectsCache', JSON.stringify(projectsData));
                }

            } catch (error) {
                console.log('Error fetching projects:', error)
            }
            finally {
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    return (
        <div className='bg'>
            <div className="projects-container-asana">
                <p className='projects-asana'>Projects</p>
                {loading ? <div><ClipLoader /></div> :
                    <ul className="projects-list-asana">
                        {projects.map((project) => (
                            <li key={project.gid} className="project-item-asana">
                                <Link to={`/asana-internal/tasks/${project.gid}`} className="project-link">{project.name}</Link>
                            </li>
                        ))}
                    </ul>

                }
            </div>
        </div>
    );
};

export default Projects;


