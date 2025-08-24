import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{R as h}from"./index-CvLvJ4fi.js";import"./_commonjsHelpers-Cpj98o6Y.js";const U="_table_1dvkn_1",K="_sortable_1dvkn_36",Q="_sortIcon_1dvkn_41",X="_clickableRow_1dvkn_47",Y="_paginationBar_1dvkn_62",Z="_pageSizeContainer_1dvkn_71",ee="_pager_1dvkn_77",ae="_pageInfo_1dvkn_85",ne="_pageSizeInfo_1dvkn_91",re="_pageBtn_1dvkn_97",te="_pageSize_1dvkn_71",r={table:U,sortable:K,sortIcon:Q,clickableRow:X,paginationBar:Y,pageSizeContainer:Z,pager:ee,pageInfo:ae,pageSizeInfo:ne,pageBtn:re,pageSize:te};function M({columns:t,data:i,initialSortBy:A,pageSizeOptions:O=[5,10,20],initialPageSize:E=5,onRowClick:p,showPageSizeSelector:w=!0}){const[o,V]=h.useState(A||null),[l,c]=h.useState(0),[d,F]=h.useState(E),g=h.useMemo(()=>{if(!o)return i;const e=t[o.index];if(!e||typeof e.accessor=="function")return i;const n=e.accessor,s=[...i];return s.sort((v,J)=>{const k=v[n],_=J[n];if(k===_)return 0;if(k==null)return 1;if(_==null)return-1;const N=k>_?1:-1;return o.direction==="asc"?N:-1*N}),s},[i,o,t]),m=Math.max(1,Math.ceil(g.length/d)),u=l*d,L=g.slice(u,u+d),G=e=>{t[e].sortable&&(c(0),V(n=>!n||n.index!==e?{index:e,direction:"asc"}:n.direction==="asc"?{index:e,direction:"desc"}:null))},H=(e,n)=>{p&&p(e,n)};return a.jsxs("div",{children:[a.jsxs("table",{className:r.table,children:[a.jsx("thead",{children:a.jsx("tr",{children:t.map((e,n)=>a.jsxs("th",{onClick:()=>G(n),className:e.sortable?r.sortable:void 0,style:{width:e.width,minWidth:e.minWidth,maxWidth:e.maxWidth},children:[e.header,(o==null?void 0:o.index)===n&&a.jsx("span",{className:r.sortIcon,children:o.direction==="asc"?"▲":"▼"})]},n))})}),a.jsx("tbody",{children:L.map((e,n)=>a.jsx("tr",{onClick:()=>H(e,u+n),className:p?r.clickableRow:void 0,style:p?{cursor:"pointer"}:void 0,children:t.map((s,v)=>a.jsx("td",{style:{width:s.width,minWidth:s.minWidth,maxWidth:s.maxWidth},children:typeof s.accessor=="function"?s.accessor(e):e[s.accessor]},v))},n))})]}),a.jsxs("div",{className:r.paginationBar,children:[w&&a.jsx("div",{className:r.pageSizeContainer,children:a.jsx("select",{className:r.pageSize,value:d,onChange:e=>{F(Number(e.target.value)),c(0)},children:O.map(e=>a.jsxs("option",{value:e,children:[e," / page"]},e))})}),a.jsxs("div",{className:r.pager,children:[a.jsx("button",{className:r.pageBtn,onClick:()=>c(0),disabled:l===0,children:"« First"}),a.jsx("button",{className:r.pageBtn,onClick:()=>c(e=>Math.max(0,e-1)),disabled:l===0,children:"‹ Prev"}),a.jsxs("span",{className:r.pageInfo,children:["Page ",l+1," / ",m]}),a.jsx("button",{className:r.pageBtn,onClick:()=>c(e=>Math.min(m-1,e+1)),disabled:l>=m-1,children:"Next ›"}),a.jsx("button",{className:r.pageBtn,onClick:()=>c(m-1),disabled:l>=m-1,children:"Last »"})]}),w&&a.jsx("div",{className:r.pageSizeContainer,children:a.jsxs("span",{className:r.pageSizeInfo,children:["Showing ",u+1,"-",Math.min(u+d,g.length)," of"," ",g.length," items"]})})]})]})}M.__docgenInfo={description:"",methods:[],displayName:"Table",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  sortable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}`,signature:{properties:[{key:"header",value:{name:"string",required:!0}},{key:"accessor",value:{name:"union",raw:"keyof T | ((row: T) => React.ReactNode)",elements:[{name:"T"},{name:"unknown"}],required:!0}},{key:"sortable",value:{name:"boolean",required:!1}},{key:"width",value:{name:"string",required:!1}},{key:"minWidth",value:{name:"string",required:!1}},{key:"maxWidth",value:{name:"string",required:!1}}]}}],raw:"TableColumn<T>[]"},description:""},data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:""},initialSortBy:{required:!1,tsType:{name:"signature",type:"object",raw:"{ index: number; direction: 'asc' | 'desc' }",signature:{properties:[{key:"index",value:{name:"number",required:!0}},{key:"direction",value:{name:"union",raw:"'asc' | 'desc'",elements:[{name:"literal",value:"'asc'"},{name:"literal",value:"'desc'"}],required:!0}}]}},description:""},pageSizeOptions:{required:!1,tsType:{name:"Array",elements:[{name:"number"}],raw:"number[]"},description:"",defaultValue:{value:"[5, 10, 20]",computed:!1}},initialPageSize:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"5",computed:!1}},onRowClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(row: T, rowIndex: number) => void",signature:{arguments:[{type:{name:"T"},name:"row"},{type:{name:"number"},name:"rowIndex"}],return:{name:"void"}}},description:""},showPageSizeSelector:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}}};const le={title:"Primitives/Table",component:M},y=[{name:"Alice",role:"Admin"},{name:"Bob",role:"User"},{name:"Carol",role:"Editor"},{name:"David",role:"Manager"},{name:"Eve",role:"Developer"},{name:"Frank",role:"Designer"},{name:"Grace",role:"Tester"},{name:"Henry",role:"Analyst"},{name:"Ivy",role:"Support"},{name:"Jack",role:"Lead"}],b={args:{columns:[{header:"Name",accessor:"name",sortable:!0},{header:"Role",accessor:"role",sortable:!0}],data:y,initialSortBy:{index:0,direction:"asc"}}},x={args:{columns:[{header:"Name",accessor:"name",sortable:!0},{header:"Role",accessor:"role",sortable:!0}],data:y,initialSortBy:{index:0,direction:"asc"},onRowClick:(t,i)=>{console.log(`Clicked row ${i}:`,t),alert(`Clicked on ${t.name} (${t.role}) at index ${i}`)}}},S={args:{columns:[{header:"Name",accessor:"name",sortable:!0},{header:"Role",accessor:"role",sortable:!0}],data:y,initialSortBy:{index:0,direction:"asc"},showPageSizeSelector:!1}},f={args:{columns:[{header:"Name",accessor:"name",sortable:!0},{header:"Role",accessor:"role",sortable:!0}],data:y,initialSortBy:{index:0,direction:"asc"},pageSizeOptions:[3,5,10,15],initialPageSize:3}};var z,j,C;b.parameters={...b.parameters,docs:{...(z=b.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    columns: [{
      header: 'Name',
      accessor: 'name',
      sortable: true
    }, {
      header: 'Role',
      accessor: 'role',
      sortable: true
    }],
    data: sampleData,
    initialSortBy: {
      index: 0,
      direction: 'asc'
    }
  }
}`,...(C=(j=b.parameters)==null?void 0:j.docs)==null?void 0:C.source}}};var R,T,B;x.parameters={...x.parameters,docs:{...(R=x.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    columns: [{
      header: 'Name',
      accessor: 'name',
      sortable: true
    }, {
      header: 'Role',
      accessor: 'role',
      sortable: true
    }],
    data: sampleData,
    initialSortBy: {
      index: 0,
      direction: 'asc'
    },
    onRowClick: (row, rowIndex) => {
      console.log(\`Clicked row \${rowIndex}:\`, row);
      alert(\`Clicked on \${row.name} (\${row.role}) at index \${rowIndex}\`);
    }
  }
}`,...(B=(T=x.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};var I,W,q;S.parameters={...S.parameters,docs:{...(I=S.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    columns: [{
      header: 'Name',
      accessor: 'name',
      sortable: true
    }, {
      header: 'Role',
      accessor: 'role',
      sortable: true
    }],
    data: sampleData,
    initialSortBy: {
      index: 0,
      direction: 'asc'
    },
    showPageSizeSelector: false
  }
}`,...(q=(W=S.parameters)==null?void 0:W.docs)==null?void 0:q.source}}};var P,D,$;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    columns: [{
      header: 'Name',
      accessor: 'name',
      sortable: true
    }, {
      header: 'Role',
      accessor: 'role',
      sortable: true
    }],
    data: sampleData,
    initialSortBy: {
      index: 0,
      direction: 'asc'
    },
    pageSizeOptions: [3, 5, 10, 15],
    initialPageSize: 3
  }
}`,...($=(D=f.parameters)==null?void 0:D.docs)==null?void 0:$.source}}};const ce=["Default","WithRowClick","WithoutPageSizeSelector","CustomPageSizeOptions"];export{f as CustomPageSizeOptions,b as Default,x as WithRowClick,S as WithoutPageSizeSelector,ce as __namedExportsOrder,le as default};
