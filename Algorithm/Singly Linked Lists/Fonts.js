class Node {
    constructor(val){
        this.value = val;
        this.next = null;
    }
}
class SLL {
    constructor(){
        this.head = null;
    }
    addFont(value) {
        var newNode = new Node(value);
        newNode.next = newNode;
        this.head = newNode;
        return this.head;
    }
    removeFont() {
        var removeNode = this.head;
        this.head = removeNode.next;
        removeNode.next = null;
        return this.head;
    }
    font() {
        return this.head ? this.head.value : null;
    }
}

var testFonts = new SLL();

testFonts.addFont(10);
testFonts.removeFont();

console.log(testFonts);