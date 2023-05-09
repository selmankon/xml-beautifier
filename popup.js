document.getElementById('input').value = localStorage.getItem('input') || '';
document.getElementById('output').value = localStorage.getItem('output') || '';

document.getElementById('beautify').addEventListener('click', () => {
  const input = document.getElementById('input').value;
  try {
    const output = xmlBeautify(input);

    localStorage.setItem('input', input);
    localStorage.setItem('output', output);

    document.getElementById('output').value = output;
  } catch (error) {
    alert("Enter a valid XML string");
  }
});

function xmlBeautify(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');


  if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
    throw new Error('XML parsing error');
  }

  function beautifyNode(node, level = 0) {
    let result = "";
    const indent = "  ";
    const newLine = "\n";

    if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent.trim();
      if (textContent) {
        result += textContent;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      result += newLine + indent.repeat(level) + "<" + node.nodeName;
      for (let i = 0; i < node.attributes.length; i++) {
        result += " " + node.attributes[i].name + '="' + node.attributes[i].value + '"';
      }
      result += ">";
      
      let textContentOnly = true;
      for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType !== Node.TEXT_NODE) {
          textContentOnly = false;
          break;
        }
      }

      for (let i = 0; i < node.childNodes.length; i++) {
        result += beautifyNode(node.childNodes[i], textContentOnly ? 0 : level + 1);
      }
      if (node.childNodes.length && !textContentOnly) {
        result += newLine + indent.repeat(level);
      }
      result += "</" + node.nodeName + ">";
    }

    return result;
  }

  const firstNodeEndIndex = xmlString.indexOf("?>") + 2;
  const firstNode = xmlString.substring(0, firstNodeEndIndex);
  return firstNode + beautifyNode(xmlDoc.documentElement);
}
 
  