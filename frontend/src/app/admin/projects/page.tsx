"use client";
import ProjectCard from "@/components/project-card";
import { getProjectsByToken } from "@/services/project";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<
    { title: string; body: string; id: string }[]
  >([]);
  useEffect(() => {
    const data = async () => {
      const token = Cookies.get("token");
      if (!token) return;
      setProjects(await getProjectsByToken(token));
    };
    data();
  }, []);
  return (
    <div className="mt-4 flex flex-col">
      <div>
        <Link
          href={"/admin/project"}
          className="rounded-lg bg-primary p-2 text-black"
        >
          Criar projeto
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {projects.map((project) => {
          return (
            <ProjectCard
              body={project.body}
              title={project.title}
              id={project.id}
              setProjects={setProjects}
            />
          );
        })}
      </div>
    </div>
  );
}
