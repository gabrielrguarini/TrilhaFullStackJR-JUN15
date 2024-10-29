"use client";
import ProjectCard from "@/components/project-card";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<
    { title: string; body: string; id: number }[]
  >([]);
  const router = useRouter();
  useEffect(() => {
    const data = async () => {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:3333/projects`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });
      if (!response.ok) {
        router.push("/projects");
      }
      const resData = await response.json();
      console.log(resData);
      setProjects(resData);
      if (!resData) {
        router.push("/projects");
      }
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
            />
          );
        })}
      </div>
    </div>
  );
}
