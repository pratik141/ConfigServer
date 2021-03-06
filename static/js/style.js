$(function() {
  $.extend($.ui.autocomplete.prototype, {
    _renderMenu: function(ul, items) {
      //remove scroll event to prevent attaching multiple scroll events to one container element
      $(ul).unbind("scroll");

      var self = this;
      self._scrollMenu(ul, items);
    },

    _scrollMenu: function(ul, items) {
      var self = this;
      var maxShow = 5;
      var results = [];
      var pages = Math.ceil(items.length / maxShow);
      results = items.slice(0, maxShow);

      if (pages > 1) {
        $(ul).scroll(function() {
          if (isScrollbarBottom($(ul))) {
            ++window.pageIndex;
            if (window.pageIndex >= pages) return;

            results = items.slice(window.pageIndex * maxShow, window.pageIndex * maxShow + maxShow);

            //append item to ul
            $.each(results, function(index, item) {
              self._renderItem(ul, item);
            });
            //refresh menu
            self.menu.deactivate();
            self.menu.refresh();
            // size and position menu
            ul.show();
            self._resizeMenu();
            ul.position($.extend({
              of: self.element
            }, self.options.position));
            if (self.options.autoFocus) {
              self.menu.next(new $.Event("mouseover"));
            }
          }
        });
      }

      $.each(results, function(index, item) {
        self._renderItem(ul, item);
      });
    }
  });

  function isScrollbarBottom(container) {
    var height = container.outerHeight();
    var scrollHeight = container[0].scrollHeight;
    var scrollTop = container.scrollTop();
    if (scrollTop >= scrollHeight - height) {
      return true;
    }
    return false;
  };

  $("#filelistid").autocomplete({
    source: availableTags,

    //you can also get source through Ajax
    
    function (request, response) {
        $.ajax({
            type: "POST",
            url: ".....",
            contentType: "application/json; charset=utf-8",
            data: "{ searchItem: '" + request.term + "'}",
            dataType: "json",
            success: function (data) {
                response($.map(data.d, function (item) {
                    if (typeof item === "string") {
                        return {
                            label: item,
                            value: item
                        };
                    }
                    return $.extend({
                        label: item.label || item.value,
                        value: item.value || item.label
                    }, item);
                }));
            },
            error: function (xhr, error) {
                alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
                alert("responseText: " + xhr.responseText);
            }
        });
    },
    minLength: 0,
    delay: 0
  }).focus(function() {
    //reset result list's pageindex when focus on
    window.pageIndex = 0;
    $(this).autocomplete("search");
  });
});

