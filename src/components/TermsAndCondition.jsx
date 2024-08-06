"use client";

import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";

const renderTextWithDecorations = (textData) => {
  if (!textData.decorations || textData.decorations.length === 0) {
    return textData.text;
  }

  return textData.decorations.reduce((acc, decoration) => {
    switch (decoration.type) {
      case "ITALIC":
        return <i>{acc}</i>;
      case "BOLD":
        return <b>{acc}</b>;
      case "LINK":
        return (
          <a
            href={decoration.linkData.link.url}
            target="_blank"
            rel="noreferrer"
          >
            {acc}
          </a>
        );
      default:
        return acc;
    }
  }, textData.text);
};

const renderNode = (node) => {
  switch (node.type) {
    case "HEADING":
      const headingClass = "fs--30 text-center text-uppercase white-1 ";

      return (
        <HeadingComponent
          level={node.headingData.level}
          className={headingClass}
        >
          {renderTextWithDecorations(node.nodes[0].textData)}
        </HeadingComponent>
      );
    case "PARAGRAPH":
      return (
        <p>
          {node.nodes.map((n, idx) => (
            <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
          ))}
        </p>
      );
    case "ORDERED_LIST":
      return (
        <ol>
          {node.nodes.map((listItem) => (
            <li key={listItem.id}>
              {listItem.nodes[0].nodes.map((n, idx) => (
                <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
              ))}
            </li>
          ))}
        </ol>
      );
    case "BULLETED_LIST":
      return (
        <ul>
          {node.nodes.map((listItem) => (
            <li key={listItem.id}>
              {listItem.nodes[0].nodes.map((n, idx) => (
                <span key={idx}>{renderTextWithDecorations(n.textData)}</span>
              ))}
            </li>
          ))}
        </ul>
      );
    case "DIVIDER":
      return <hr />;
    default:
      return null;
  }
};
const HeadingComponent = ({ level, children }) => {
  const HeadingTag = `h${level}`;
  return <HeadingTag>{children}</HeadingTag>;
};

const TermsAndCondition = ({ data }) => {
  const nodes = data.content.nodes;

  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  return (
    <section className="section-terms-and-policy">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-11 offset-lg-3 mx-mobile-auto">
            {nodes[0].nodes && (
              <h1 className="title split-words" data-aos="d:loop">
                {nodes[0].nodes[0].textData.text}
              </h1>
            )}
            <div
              className="editor"
              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
            >
              {nodes.slice(1).map((node) => (
                <div key={node.id}>{renderNode(node)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndCondition;
