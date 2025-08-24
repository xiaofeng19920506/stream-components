import{j as a}from"./jsx-runtime-BjG_zV1W.js";import{R as g}from"./index-CvLvJ4fi.js";import{c as y}from"./clsx-B-dksMZM.js";import"./_commonjsHelpers-Cpj98o6Y.js";const R="_wrapper_1yn4f_1",T="_bubble_1yn4f_5",k="_visible_1yn4f_27",x="_top_1yn4f_31",w="_bottom_1yn4f_36",N="_left_1yn4f_41",j="_right_1yn4f_48",o={wrapper:R,bubble:T,visible:k,top:x,bottom:w,left:N,right:j};function d({content:f,children:b,placement:h="top",trigger:t="hover"}){const[_,l]=g.useState(!1),e={};return t==="hover"||(t==="click"?e.onClick=()=>l(v=>!v):t==="focus"&&(e.onFocus=()=>l(!0),e.onBlur=()=>l(!1),e.tabIndex=0)),a.jsxs("span",{className:o.wrapper,...e,children:[b,a.jsx("span",{className:y(o.bubble,o[h],t!=="hover"&&_&&o.visible),children:f})]})}d.__docgenInfo={description:"",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"",defaultValue:{value:"'top'",computed:!1}},trigger:{required:!1,tsType:{name:"union",raw:"'hover' | 'click' | 'focus'",elements:[{name:"literal",value:"'hover'"},{name:"literal",value:"'click'"},{name:"literal",value:"'focus'"}]},description:"",defaultValue:{value:"'hover'",computed:!1}}}};const E={title:"Primitives/Tooltip",component:d},r={args:{content:"Tooltip",children:a.jsx("button",{children:"Hover me"}),placement:"top"}},n={args:{content:"Tooltip",children:a.jsx("button",{children:"Click me"}),placement:"right",trigger:"click"}};var s,c,i;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip',
    children: <button>Hover me</button>,
    placement: 'top'
  }
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var p,m,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    content: 'Tooltip',
    children: <button>Click me</button>,
    placement: 'right',
    trigger: 'click'
  }
}`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};const I=["HoverTop","ClickRight"];export{n as ClickRight,r as HoverTop,I as __namedExportsOrder,E as default};
