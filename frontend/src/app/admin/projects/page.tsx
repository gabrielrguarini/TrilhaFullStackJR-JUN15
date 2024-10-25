"use client";
import Cookies from "js-cookie";
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
    <div className="mt-4 flex flex-wrap justify-center gap-2">
      {projects.map((project, index) => {
        return (
          <div
            onClick={() => {
              router.push(`/admin/project/${project.id}`);
            }}
            key={index}
            className="max-h-40 max-w-64 cursor-pointer overflow-hidden text-ellipsis border-2 border-primary p-2"
          >
            <h3 className="text-xl font-semibold text-primary">
              {project.title}
            </h3>
            <p>{project.body}</p>
          </div>
        );
      })}
    </div>
  );
}
