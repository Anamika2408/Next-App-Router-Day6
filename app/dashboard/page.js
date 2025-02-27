"use client";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/"); 
    }
  }, [session, router]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  if (!session) return null; 
  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "https://accounts.google.com/Logout"; 
  };
  
  return (
    <div className="container">
      <h1>Welcome, {session?.user?.name}</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="user-list">
        <h2>User List:</h2>
        <ul>
            {users.map((user) => (
            <li key={user.id}>{user.name}</li> 
            ))}
        </ul>
      </div>
    </div>
  );
}
