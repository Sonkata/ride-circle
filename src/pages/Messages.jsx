import { Link } from "react-router-dom";

const conversations = [
  {
    id: 1,
    riderId: 2,
    name: "Alex",
    city: "Sofia",
    avatar: "🔥",
    lastMessage: "Are you joining the Sunday ride?",
    time: "10 min ago",
    status: "Online"
  },
  {
    id: 2,
    riderId: 3,
    name: "Mira",
    city: "Plovdiv",
    avatar: "⚡",
    lastMessage: "That Coffee Ride looks chill.",
    time: "1 hour ago",
    status: "Away"
  },
  {
    id: 3,
    riderId: 4,
    name: "Dani",
    city: "Varna",
    avatar: "🛠️",
    lastMessage: "We meet at the gas station before the route.",
    time: "Yesterday",
    status: "Offline"
  }
];

function Messages() {
  return (
    <section className="page-section messages-page">
      <div className="section-header">
        <p className="eyebrow">Messages</p>
        <h1>Biker conversations.</h1>

        <p className="page-text">
          This is a mock messages page for the prototype. Later it can become a
          real chat system with Supabase or another backend.
        </p>
      </div>

      <div className="messages-layout">
        <div className="conversation-list">
          {conversations.map((conversation) => (
            <Link
              to={`/riders/${conversation.riderId}`}
              className="conversation-card"
              key={conversation.id}
            >
              <div className="conversation-avatar">{conversation.avatar}</div>

              <div>
                <h2>{conversation.name}</h2>
                <p>{conversation.city}</p>
                <span>{conversation.lastMessage}</span>
              </div>

              <div className="conversation-meta">
                <strong>{conversation.status}</strong>
                <small>{conversation.time}</small>
              </div>
            </Link>
          ))}
        </div>

        <div className="chat-preview">
          <p className="eyebrow">Prototype feature</p>
          <h2>Chat preview</h2>

          <div className="chat-bubble incoming">
            Are you coming to the weekend ride?
          </div>

          <div className="chat-bubble outgoing">
            Maybe, depends on the route and pace.
          </div>

          <div className="chat-bubble incoming">
            Chill pace. We meet at OMV around 18:00.
          </div>

          <div className="chat-input-mock">
            Message feature coming later...
          </div>
        </div>
      </div>
    </section>
  );
}

export default Messages;