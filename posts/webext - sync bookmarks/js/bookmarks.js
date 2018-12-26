var mlab = new Mlab('lockex1987', 'coordinate', 'lNqkzI-WP6v_uw-xx9RvM_XUROvjaa0s');

mlab.listDocuments(function(resp) {
    console.log(resp);
});


var STORAGE_KEY = 'bookmarks-vuejs-2.0'
var bookmarkStorage = {
    fetch: function() {
        var bookmarks = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        bookmarks.forEach(function(bookmark, index) {
            bookmark.id = index
        })
        bookmarkStorage.uid = bookmarks.length
        return bookmarks
    },
    save: function(bookmarks) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
    }
}


var app = new Vue({
    el: '.bookmarkapp',
    data: {
        bookmarks: bookmarkStorage.fetch(),
        newbookmark: '',
        editedbookmark: null
    },
    methods: {
        addbookmark: function() {
            var value = this.newbookmark && this.newbookmark.trim()
            if (!value) {
                return
            }
            this.bookmarks.push({
                id: bookmarkStorage.uid++,
                title: value,
                completed: false
            })
            this.newbookmark = '';
            bookmarkStorage.save(this.bookmarks);
        },

        removebookmark: function(bookmark) {
            this.bookmarks.splice(this.bookmarks.indexOf(bookmark), 1)
            bookmarkStorage.save(this.bookmarks);
        },

        editbookmark: function(bookmark) {
            this.beforeEditCache = bookmark.title
            this.editedbookmark = bookmark
            bookmarkStorage.save(this.bookmarks);
        },

        doneEdit: function(bookmark) {
            if (!this.editedbookmark) {
                return
            }
            this.editedbookmark = null
            bookmark.title = bookmark.title.trim()
            if (!bookmark.title) {
                this.removebookmark(bookmark)
            }
        },

        cancelEdit: function(bookmark) {
            this.editedbookmark = null
            bookmark.title = this.beforeEditCache
        },
    },

    // a custom directive to wait for the DOM to be updated
    // before focusing on the input field.
    // http://vuejs.org/guide/custom-directive.html
    directives: {
        'bookmark-focus': function(el, binding) {
            if (binding.value) {
                el.focus()
            }
        }
    }
});
