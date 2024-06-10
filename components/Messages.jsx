'use client';
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const Messages = () => {
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await fetch(`/api/messages`);
                if (res.status == 200) {
                    const data = await res.json();
                    setMessages(data)
                } else {
                    toast.error("Failed to fetch your Messages");
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch");
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, []);
  return (
    <div>Messages</div>
  )
}

export default Messages;