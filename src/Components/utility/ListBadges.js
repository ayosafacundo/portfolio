export default function ListBadges(badges) {
    const icons = {
        html: "fa-html5",
        javascript: "fa-js",
        nodejs: "fa-node-js",
        react: "fa-react",
        css: "fa-css3-alt"
    }
    return <div className="badges">{badges.map((e, i) => {
        return (
            <div className="tooltip" key={i}>
                <div className="tooltip__content">
                    {e}
                </div>
                <div className="tooltip__arrow"></div>
                <i className={"fa-brands " + icons[e.toLowerCase()]}></i>
            </div>)
    })}</div>
}