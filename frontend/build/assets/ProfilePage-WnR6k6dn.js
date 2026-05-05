import{c as a,r as i,j as e,H as d,L as p,d as j,F as m,e as k}from"./index-D87Y4DAt.js";const N=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],f=a("arrow-left",N);const w=[["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",key:"1ksdt3"}],["path",{d:"M22 13a18.15 18.15 0 0 1-20 0",key:"12hx5q"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],z=a("briefcase-business",w);const M=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],h=a("calendar-days",M);const _=[["path",{d:"M16 10h2",key:"8sgtl7"}],["path",{d:"M16 14h2",key:"epxaof"}],["path",{d:"M6.17 15a3 3 0 0 1 5.66 0",key:"n6f512"}],["circle",{cx:"9",cy:"11",r:"2",key:"yxgjnd"}],["rect",{x:"2",y:"5",width:"20",height:"14",rx:"2",key:"qneu4z"}]],S=a("id-card",_);const L=[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]],A=a("mail",L);const C=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],P=a("shield-check",C);const D=[["circle",{cx:"12",cy:"8",r:"5",key:"1hypcn"}],["path",{d:"M20 21a8 8 0 0 0-16 0",key:"rfgkzh"}]],E=a("user-round",D),g=`.profile-page {
    min-height: 100vh;
    background:
        radial-gradient(circle at 0% 0%, rgba(20, 184, 166, 0.12), transparent 28%),
        radial-gradient(circle at 100% 10%, rgba(6, 182, 212, 0.1), transparent 24%),
        var(--bg-primary);
}

.profile-main-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem 2.5rem 2.5rem;
}

.profile-feedback-card {
    background: var(--bg-card);
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    text-align: center;
}

.profile-feedback-card h2 {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.35rem;
}

.profile-feedback-card p {
    margin: 0.6rem 0 1rem;
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.profile-overview-panel {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    align-items: center;
    background: linear-gradient(145deg, rgba(30, 41, 59, 0.76), rgba(15, 23, 42, 0.65));
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1.25rem;
    padding: 1.35rem;
    box-shadow: 0 20px 36px rgba(2, 6, 23, 0.28);
}

.profile-kicker {
    margin: 0;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #67e8f9;
}

.profile-overview-copy h1 {
    margin: 0.35rem 0 0.55rem;
    font-size: 1.95rem;
    line-height: 1.15;
    letter-spacing: -0.02em;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.profile-overview-copy p {
    margin: 0;
    max-width: 62ch;
    color: var(--text-secondary);
    font-size: 0.92rem;
}

.profile-overview-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.65rem;
}

.profile-outline-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.45rem;
    border-radius: 999px;
    border: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 0.82rem;
    font-weight: 600;
    padding: 0.55rem 0.95rem;
    cursor: pointer;
    transition: var(--transition);
    text-decoration: none;
    font-family: inherit;
}

.profile-outline-btn:hover {
    border-color: rgba(20, 184, 166, 0.6);
    transform: translateY(-1px);
}

.profile-content-grid {
    margin-top: 1.2rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1.2rem;
    align-items: start;
}

.profile-details-card,
.profile-access-card {
    background: var(--bg-card);
    backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    box-shadow: 0 12px 26px rgba(2, 6, 23, 0.16);
    padding: 1.1rem;
}

.profile-card-header h2 {
    margin: 0;
    font-size: 1.18rem;
    color: var(--text-primary);
}

.profile-card-header p {
    margin: 0.45rem 0 0;
    color: var(--text-muted);
    font-size: 0.84rem;
}

.profile-info-grid {
    margin-top: 0.95rem;
    display: grid;
    gap: 0.65rem;
}

.profile-info-item {
    border-radius: 0.75rem;
    border: 1px solid rgba(148, 163, 184, 0.14);
    background: rgba(15, 23, 42, 0.45);
    padding: 0.72rem 0.85rem;
    display: grid;
    gap: 0.35rem;
}

.profile-info-label {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    color: var(--text-muted);
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 700;
}

.profile-info-value {
    color: var(--text-primary);
    font-size: 0.92rem;
    font-weight: 500;
    word-break: break-word;
}

.profile-access-tags {
    margin-top: 0.95rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.profile-access-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 999px;
    border: 1px solid rgba(20, 184, 166, 0.4);
    background: rgba(20, 184, 166, 0.14);
    color: #9df7ec;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 0.34rem 0.64rem;
}

.profile-access-tag.owner {
    border-color: rgba(251, 191, 36, 0.55);
    background: rgba(251, 191, 36, 0.16);
    color: #fde68a;
}

@media (max-width: 1024px) {
    .profile-main-content {
        padding: 1.7rem 1.2rem 2rem;
    }

    .profile-overview-panel {
        grid-template-columns: 1fr;
    }

    .profile-overview-actions {
        justify-content: flex-start;
    }

    .profile-content-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .profile-overview-copy h1 {
        font-size: 1.55rem;
    }
}\r
`,R={Admin:["Platform Control","Access Management","Security Oversight","Owner"],Manager:["Operations Review","Task Routing","Document Governance"],Engineer:["Contributor Workspace","Document Access","Execution Tracking"]},x=n=>{if(!n)return"Not available";const s=new Date(n);return Number.isNaN(s.getTime())?"Not available":s.toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})},I=()=>{const[n,s]=i.useState(null),[u,b]=i.useState(!0),[t,y]=i.useState("");i.useEffect(()=>{let r=!0;return(async()=>{try{const o=await k();r&&s(o)}catch(o){r&&y(o.message||"Unable to load profile.")}finally{r&&b(!1)}})(),()=>{r=!1}},[]);const v=i.useMemo(()=>n?.role?R[n.role]||["Workspace Member"]:["Workspace Member"],[n]),l=(r,c)=>e.jsxs("div",{className:"profile-page",children:[e.jsx("style",{children:g}),e.jsx(d,{}),e.jsx("main",{className:"profile-main-content",children:e.jsxs("div",{className:"profile-feedback-card",children:[e.jsx("h2",{children:r}),e.jsx("p",{children:c}),e.jsxs(p,{to:"/dashboard",className:"profile-outline-btn",children:[e.jsx(f,{size:16}),e.jsx("span",{children:"Back to Dashboard"})]})]})}),e.jsx(m,{})]});return u?l("Loading profile...","Fetching your account details."):t||!n?l("Profile unavailable",t||"Unable to load account details."):e.jsxs("div",{className:"profile-page",children:[e.jsx("style",{children:g}),e.jsx(d,{}),e.jsxs("main",{className:"profile-main-content",children:[e.jsxs("section",{className:"profile-overview-panel",children:[e.jsxs("div",{className:"profile-overview-copy",children:[e.jsx("p",{className:"profile-kicker",children:"Operations Intelligence Hub"}),e.jsx("h1",{children:n.name}),e.jsx("p",{children:"Manage your account identity, role privileges, and profile metadata synced from your authenticated workspace."})]}),e.jsx("div",{className:"profile-overview-actions",children:e.jsxs(p,{to:"/dashboard",className:"profile-outline-btn",children:[e.jsx(f,{size:16}),e.jsx("span",{children:"Back"})]})})]}),e.jsxs("section",{className:"profile-content-grid",children:[e.jsxs("article",{className:"profile-details-card",children:[e.jsxs("div",{className:"profile-card-header",children:[e.jsx("h2",{children:"Personal Info"}),e.jsx("p",{children:"Live account information from your user profile."})]}),e.jsxs("div",{className:"profile-info-grid",children:[e.jsxs("div",{className:"profile-info-item",children:[e.jsxs("span",{className:"profile-info-label",children:[e.jsx(E,{size:16})," Name"]}),e.jsx("span",{className:"profile-info-value",children:n.name||"Not available"})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsxs("span",{className:"profile-info-label",children:[e.jsx(A,{size:16})," Email"]}),e.jsx("span",{className:"profile-info-value",children:n.email||"Not available"})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsxs("span",{className:"profile-info-label",children:[e.jsx(z,{size:16})," Role"]}),e.jsx("span",{className:"profile-info-value",children:n.role||"Not available"})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsxs("span",{className:"profile-info-label",children:[e.jsx(S,{size:16})," Account ID"]}),e.jsx("span",{className:"profile-info-value",children:n._id||"Not available"})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsxs("span",{className:"profile-info-label",children:[e.jsx(h,{size:16})," Joined"]}),e.jsx("span",{className:"profile-info-value",children:x(n.createdAt)})]}),e.jsxs("div",{className:"profile-info-item",children:[e.jsxs("span",{className:"profile-info-label",children:[e.jsx(h,{size:16})," Last Updated"]}),e.jsx("span",{className:"profile-info-value",children:x(n.updatedAt)})]})]})]}),e.jsxs("aside",{className:"profile-access-card",children:[e.jsxs("div",{className:"profile-card-header",children:[e.jsx("h2",{children:"Access Scope"}),e.jsx("p",{children:"Role-driven capabilities currently granted to your account."})]}),e.jsx("div",{className:"profile-access-tags",children:v.map(r=>e.jsxs("span",{className:`profile-access-tag ${r==="Owner"?"owner":""}`,children:[r==="Owner"?e.jsx(P,{size:14}):e.jsx(j,{size:14}),e.jsx("span",{children:r})]},r))})]})]})]}),e.jsx(m,{})]})};export{I as default};
