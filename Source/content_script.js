(function () {
    function toArray(obj) {
        var array = [];
        if (!obj) {
            return array;
        }
        // iterate backwards ensuring that length is an UInt32
        for (var i = obj.length >>> 0; i--;) {
            array[i] = obj[i];
        }
        return array;
    }

    walk(document.body);

    function walk(node) {
        // I stole this function from here:
        // http://is.gd/mwZp7E

        var child, next;

        classList = toArray(node.classList);

        if (node.tagName && node.tagName.toLowerCase() === 'input') {
            return;
        }
        if (node.tagName && node.tagName.toLowerCase() === 'textarea') {
            return;
        }
        if (classList.indexOf('ace_editor') > -1) {
            return;
        }

        switch (node.nodeType) {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;

            case 3: // Text node
                handleText(node);
                break;
        }
    }


    function matchCase(sub) {
        return function (match) {
            var p = match.charAt(0);
            if (p >= 65 && p < 65 + 26) {
                return sub[0].toUpperCase() + sub.substring(1);
            } else {
                return sub[0].toLowerCase() + sub.substring(1);
            }
        };
    }

    function handleText(textNode) {
        var v = textNode.nodeValue;

        v = v.replace(/\bPax\b/g, "Passenger");
        v = v.replace(/\bpax\b/g, "passenger");
        v = v.replace(/\bDax\b/g, "Driver");
        v = v.replace(/\bdax\b/g, "driver");

        textNode.nodeValue = v;
    }


}());
