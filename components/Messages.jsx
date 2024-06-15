'use client';
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import Message from "@/components/Message";

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
    <section className="bg-blue-50">
    <div className="container m-auto py-24 max-w-6xl">
      <div
        className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <h1 className="text-3xl font-bold mb-4">Your Messages</h1>

        <div className="space-y-4">
            {loading ? <Spinner/> : (
                messages.length == 0 ? (
                    <p>No new Messages</p>
                ) : (
                    messages.map(message => <Message key={message._id} message={message}/>)                
                )
            )}
        </div>
      </div>
    </div>
  </section>
  )
}

export default Messages;