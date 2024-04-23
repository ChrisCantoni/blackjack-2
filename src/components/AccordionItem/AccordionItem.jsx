

function AccordionItem({rule, onToggle, active}) {

    

    return (
        <div className={`accordion_item ${active ? "active" : ''}`}>
            <button className="button" onClick={onToggle}>
                {rule.title}
            </button>
            <span className="control">{active ? "-" : '+'}</span>
            <div className={`description_wrapper ${active ? "open" : ''}`}>
                <div className="description">
                    {rule.description}
                </div>              
            </div>
        </div>
    )
}

export default AccordionItem;