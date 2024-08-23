import { Comment } from "../components/Dashboard"
export const Comments: Comment[] = [{
  id: "1",
  name: "Rupesh",
  comment: "Hello this my first comment",
  emoji: "😶",
  createdAt: new Date().toISOString(),
  replies: 21,
  imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
},
{
  id: "4",
  name: "Atlys",
  comment: "Giving free visa if Neeraj Chopra won any medal",
  emoji: "🤔",
  createdAt: new Date().toISOString(),
  replies: 210,
  imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
},
{
  id: "2",
  name: "John",
  comment: "Hello this my first comment",
  emoji: "😇",
  createdAt: new Date().toISOString(),
  replies: 25,
  imageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
},
{
  id: "3",
  name: "Rishab",
  comment: "Hello this my first comment",
  emoji: "😉",
  createdAt: new Date().toISOString(),
  replies: 2,
  imageUrl: "https://randomuser.me/api/portraits/men/5.jpg"
}];