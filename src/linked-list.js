const Node = require('./node');

class LinkedList {
    constructor() {
        this._tail = this._head = new Node();
        this.length = 0;
    }

    append(data) {
        var node = new Node(data, null, null);
        if (this.length > 0) {
            node.prev = this._tail;
            this._tail.next = node;
        } else {
            this._head = node;
        }
        this._tail = node;
        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        var node = this._getNodeAt(index);
        if(node != null)
           return node.data;
    }

    insertAt(index, data) {
        var curNode = this._getNodeAt(index);
        if(curNode != null) {
            var prevNode = curNode.prev;
            var newNode = new Node(data, curNode.prev, curNode);
            curNode.prev = newNode;
            prevNode.next = newNode;
            this.length++;
        }
        return this;
    }

    isEmpty() {
        return !(this.length > 0)
    }

    clear() {
        this._head = this._tail = new Node();
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        var curNode = this._getNodeAt(index);
        if(curNode != null) {
            var prevNode = curNode.prev;
            var nextNode = curNode.next;
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            this.length--;
        }
        return this;
    }

    reverse() {
        if(this.length > 1 && !this.isEmpty()) {
            var headPivot = this._head;
            var tailPivot = this._tail;
            var swapVar = null;
            for(var i=0,j=this.length-1; i<j; i++,j--) {
                swapVar = headPivot.data;
                headPivot.data = tailPivot.data;
                tailPivot.data = swapVar;
                
                headPivot = headPivot.next;
                tailPivot = tailPivot.prev;
            }
        }
        return this;
    }

    indexOf(data) {
        if(!this.isEmpty()) {
            var searchNode = this._head;
            for(var i = 0; i<this.length; i++) {
                if(searchNode.data === data)
                    return i;
                searchNode = searchNode.next;
            }
        }
        return -1;
    }
    
    _getNodeAt(index) {
        var searchNode = null;
        if(this.length >= index && !this.isEmpty()) {
            searchNode = this._head;
            for(var i = 0; i<index; i++)
                searchNode = searchNode.next;
        }
        return searchNode;
    }
}

module.exports = LinkedList;
