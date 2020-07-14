
let list1 = []


function multiplyNode(node, count, deep) {

    console.log(node)
    for (var i = 0, copy; i < count - 1; i++) {
        copy = node.cloneNode(deep);
        copy.id = "test"
        node.parentNode.insertBefore(copy, node);
    }
}

function remove(el) {
  var element = el;
  element.remove();
}
