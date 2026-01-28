"use client";

import { useTaskStore } from "@/entities/task/store";
import { FormEvent, useRef } from "react";

export default function User() {
  const user = useTaskStore((s) => s.user);
  const setUser = useTaskStore((s) => s.setUser);
  const refUser = useRef("");

  console.log("render user page");

  function onsubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUser(refUser.current);
  }

  return (
    <div>
      <div>{user}</div>
      <form onSubmit={onsubmit}>
        <input
          className="border"
          onChange={(e) => (refUser.current = e.target.value)}
        />
        <button className="bg-amber-200 rounded cursor-pointer" type="submit">
          Set user
        </button>
      </form>
    </div>
  );
}
