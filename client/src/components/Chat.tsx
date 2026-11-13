import {useMemo,useState} from 'react';
import {Send,Smile,Reply,MessageCircle,LockKeyhole} from 'lucide-react';
import {useApp} from '../context/AppContext';

type Pair='customer-owner'|'customer-rider'|'owner-rider';
export default function Chat(){
 const {user,messages,sendMessage,reactMessage,orders}=useApp();
 const [room,setRoom]=useState(''),[draft,setDraft]=useState(''),[reply,setReply]=useState<string|undefined>(),[sending,setSending]=useState(false),[error,setError]=useState('');
 const rooms=useMemo(()=>orders.flatMap(o=>{
  if(!user)return [];
  const result:any[]=[];
  const add=(pair:Pair,name:string,avatar:string='')=>result.push({id:`order-${o.id}__${pair}`,name,avatar,order:o,pair});
  if(user.role==='customer'&&o.customerId===user.id){add('customer-owner',`${o.ownerName||'Food owner'} · ${o.foodName}`,o.ownerLogo||'');if(o.riderId)add('customer-rider',`${o.riderName||'Assigned rider'} · ${o.foodName}`,o.riderProfilePicture||'')}
  if(user.role==='owner'&&o.ownerId===user.id){add('customer-owner',`${o.customerName} · ${o.foodName}`,o.customerProfilePicture||'');if(o.riderId)add('owner-rider',`${o.riderName||'Assigned rider'} · ${o.foodName}`,o.riderProfilePicture||'')}
  if(user.role==='rider'&&o.riderId===user.id){add('customer-rider',`${o.customerName} · ${o.foodName}`,o.customerProfilePicture||'');add('owner-rider',`${o.ownerName||'Food owner'} · ${o.foodName}`,o.ownerLogo||'')}
  return result;
 }),[orders,user]);
 const current=rooms.some(r=>r.id===room)?room:rooms[0]?.id;
 const active=rooms.find(r=>r.id===current);
 const visible=messages.filter(m=>m.roomId===current);
 const submit=async()=>{if(!draft.trim()||!current||sending)return;setSending(true);setError('');try{await sendMessage(current,draft.trim(),reply);setDraft('');setReply(undefined)}catch(e:any){setError(e?.response?.data?.message||'Message could not be sent. Please try again.')}finally{setSending(false)}};
 return <div className="chat-layout"><aside className="chat-rooms"><div className="chat-head"><h2>Messages</h2><span>Private conversations</span></div>{rooms.length?rooms.map(r=><button className={`room-item ${current===r.id?'selected':''}`} key={r.id} onClick={()=>setRoom(r.id)}><div className="avatar">{r.avatar?<img src={r.avatar} alt=""/>:r.name[0]}</div><div><b>{r.name}</b><small>{r.pair==='customer-owner'?'Customer ↔ Owner':r.pair==='customer-rider'?'Customer ↔ Rider':'Owner ↔ Rider'} · Private</small></div><i className="online-dot"/></button>):<div className="empty-small">Private order conversations will appear here when an order is available.</div>}</aside><section className="chat-window"><div className="chat-window-head"><div className="avatar">{active?.avatar?<img src={active.avatar} alt=""/>:active?.name[0]||'?'}</div><div><b>{active?.name||'No conversation yet'}</b><small><LockKeyhole size={11} style={{display:'inline',verticalAlign:'-2px'}}/> Private conversation · Only these two participants can see it</small></div></div><div className="chat-body">{visible.length?visible.map(m=><div className={`message-row ${m.senderId===user?.id?'mine':''}`} key={m.id}><div className="message-bubble">{m.replyTo&&<small className="reply-quote">↪ Replied to a message</small>}{m.text}{m.reaction&&<span className="reaction">{m.reaction}</span>}<small>{m.senderName} · {new Date(m.createdAt).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</small></div><div className="message-tools"><button title="React" onClick={()=>reactMessage(m.id,m.reaction?'':'❤️').catch(()=>setError('Could not update the reaction. Please try again.'))}><Smile size={14}/></button><button title="Reply" onClick={()=>setReply(m.id)}><Reply size={14}/></button></div></div>):<div className="chat-empty"><div className="chat-empty-icon"><MessageCircle/></div><b>Start a private conversation</b><span>Only you and the selected person can see these messages.</span></div>}</div><div className="chat-compose">{reply&&<div className="replying">Replying to a message <button onClick={()=>setReply(undefined)}>×</button></div>}<input value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&submit()} placeholder="Write a private message..."/><button type="button" className="send-btn" disabled={sending||!draft.trim()||!current} onClick={submit}><Send size={18}/></button>{error&&<small className="chat-error">{error}</small>}</div></section></div>
}
