import * as React from 'react';
import { render } from 'react-dom';
import {getHighlights, setHighlights} from "./database";

const hlRoot = document.getElementById('highlighter-root');

const HighlighterMenu = () => {
    let obj = {
        a: 10,
        b: 50
    };
    const highlightSelection = (color: string) => {
        highlighter?.highlightSelection(`highlight-${color}`);
        highlightUpdated();
    };

    const clearHighlights = () => {
        highlighter?.unhighlightSelection();
        highlightUpdated();
    };

    return (
        <div className={"highlight-menu"}>
            <button onClick={() => highlightSelection("red")} className={"highlight-color-selector red"}/>
            <button onClick={() => highlightSelection("yellow")} className={"highlight-color-selector yellow"}/>
            <button onClick={() => highlightSelection("green")} className={"highlight-color-selector green"}/>
            <button onClick={() => highlightSelection("blue")} className={"highlight-color-selector blue"}/>
            <button onClick={() => highlightSelection("purple")} className={"highlight-color-selector purple"}/>
            <button onClick={() => clearHighlights()} className={"highlight-color-selector clear"}>&times;</button>
        </div>
    );
};

let highlighter: RangyHighlighter;
const rangy = window.rangy;
const urlHash = window.__contentUrlHash ?? window.location.href;

const highlightUpdated = () => {
    if (hlRoot) hlRoot.style.visibility = 'hidden';
    window.getSelection()?.removeAllRanges();
    const serialized = highlighter?.serialize();
    setHighlights(urlHash, {
        highlights: serialized
    });
};

window.onload = async function() {
    if (rangy) {
        rangy.init();
        highlighter = rangy.createHighlighter();

        const hlOptions = {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"],
            elementProperties: {
                href: "#",
                onclick: function() {
                    var highlight = highlighter?.getHighlightForElement(this);
                    if (window.confirm("Delete this highlight? #" + highlight.id)) {
                        highlighter?.removeHighlights( [highlight] );
                        highlightUpdated();
                    }
                    return false;
                }
            }
        };

        highlighter.addClassApplier(rangy.createClassApplier("highlight-red", hlOptions));
        highlighter.addClassApplier(rangy.createClassApplier("highlight-blue", hlOptions));
        highlighter.addClassApplier(rangy.createClassApplier("highlight-yellow", hlOptions));
        highlighter.addClassApplier(rangy.createClassApplier("highlight-green", hlOptions));
        highlighter.addClassApplier(rangy.createClassApplier("highlight-purple", hlOptions));

        const savedHighlights = await getHighlights(urlHash);
        if (savedHighlights?.highlights) {
            highlighter.deserialize(savedHighlights.highlights);
        }
    }
};

window.addEventListener(
    'mouseup',
    (event) => {
    let selection = window.getSelection()
        console.log(event);
    if (!selection?.isCollapsed) {
        let range = selection?.getRangeAt(0);
        let position = range?.getBoundingClientRect();
        if (hlRoot && position) {
            hlRoot.style.top = (position.y + position.height + window.scrollY) + 'px';
            hlRoot.style.left = (position.x + (position.width / 2)) + 'px';
            hlRoot.style.visibility = 'visible';
        }
    } else {
        if (hlRoot) hlRoot.style.visibility = 'hidden';
    }
});

render(<HighlighterMenu/>, document.querySelector("#highlighter-root"));