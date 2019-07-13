
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    const landing = {
      title: "Are you a 10x Engineer?",
      button: "Start Quiz"
    };

    const questions = [
      {
        q: "Do you love meetings?",
        r: [
          {
            value: 1,
            text:
              "Meetings are necessary to build a healthy startup and develop the team communication."
          },
          {
            value: 3,
            text:
              "I think it is a waste of time and obvious things are being discussed."
          },
          {
            value: 3,
            text:
              'I only attend "Staff meetings" called by the manager to discuss features and status.'
          }
        ]
      },
      {
        q: "How about timing in the office? are you responsible with that?",
        r: [
          {
            value: 3,
            text:
              "My timing is highly irregular, I am a late-night coder and come late to the office."
          },
          {
            value: 2,
            text: "My timing is sometimes irregular but I always try to be on time."
          },
          {
            value: 1,
            text:
              "My timing is highly regular, even I like to code late-night, I know my responsabilities."
          }
        ]
      },
      {
        q: "Do you like team working?",
        r: [
          {
            value: 3,
            text:
              "I prefer to work when very few folks are around. I am not visible in all-hands meetings."
          },
          {
            value: 1,
            text:
              "I prefer to work in a quiet envioment. To share opinions and discoveries is important."
          },
          {
            value: 1,
            text:
              "I focus on my work (maybe listening music) and I like to share my opinions and discoveries."
          }
        ]
      },
      {
        q: "Preferred style",
        r: [
          {
            value: 2,
            text:
              "My laptop screen background is normally a landscape, I often change defaults."
          },
          {
            value: 3,
            text:
              "My laptop screen background color is black, I always change defaults."
          },
          {
            value: 1,
            text:
              "My don't remember my laptop screen background, surely is the default."
          }
        ]
      },
      {
        q: "Does your keyboard have worn keys?",
        r: [
          {
            value: 2,
            text: "Yes, keys such as a, s, d and w."
          },
          {
            value: 2,
            text: "Yes, keys such as q, w, e and r."
          },
          {
            value: 3,
            text: "Yes, keys such as i, f and x."
          },
          {
            value: 3,
            text: "No, I code in my phone."
          },
          {
            value: 3,
            text: "No, I buy a new laptop every year."
          }
        ]
      },
      {
        q: "Do you know your code?",
        r: [
          {
            value: 1,
            text:
              "I understand the code and is easy for me to find something but I don't know every line."
          },
          {
            value: 3,
            text:
              "I know every line of code that has gone into production so I fix bugs in hours vs days."
          },
          {
            value: 2,
            text:
              "I know every line of code that has gone into sandbox so I don't fix bugs in production."
          },
          {
            value: 1,
            text: "I am not a robot.",
            robot: true
          }
        ]
      },
      {
        q: "Are you a full-stack engineer?",
        r: [
          {
            value: 3,
            text:
              "Yes, code is code, I don't care whether it is front-end, back-end, API, database, serverless, etc. and I rarely do UI work."
          },
          {
            value: 2,
            text:
              "Yes, I can handle front-end and back-end. I am specialized in certain technologies."
          },
          {
            value: 1,
            text:
              "No, I can code anything but I also do UI work... wait, but front-end and UI are related, isn't it?."
          }
        ]
      },
      {
        q:
          'Can you convert "thought" into "code" in your mind and write it in an iterative fashion?',
        r: [
          {
            value: 3,
            text: "Yes, I always do this."
          },
          {
            value: 2,
            text: "Yes, if that thought is easy to code."
          },
          {
            value: 1,
            text: "No."
          }
        ]
      },
      {
        q:
          "Given a product feature, you can write that entire feature in one or two sittings of 4 to 6 hours with a caffeinated drink without distraction.",
        r: [
          {
            value: 2,
            text: "I don't like caffeinated drinks dude."
          },
          {
            value: 3,
            text: "Of course, I am doing this test before the second sitting."
          },
          {
            value: 3,
            text: "Let's make it a 3 hours sitting."
          },
          {
            value: 1,
            text: "Obviously that depends of the product feature complexity."
          }
        ]
      },
      {
        q: "Do you look at help documentation of classes or methods?",
        r: [
          {
            value: 1,
            text:
              "Even I have great knowledge, sometimes I need some help, it's normal."
          },
          {
            value: 3,
            text:
              "I know it in memory and can recall from memory. I write code at the same ease as writing English. No breaks, no pauce, just type."
          },
          {
            value: 2,
            text: "I told you I am not a robot.",
            robot: true
          }
        ]
      },
      {
        q:
          "I am learning new frameworks, languages ahead of everyone in the company. I gobble up, setup, experiment before anyone is getting started.",
        r: [
          {
            value: 1,
            text: "Only on weekends, if I have the time."
          },
          {
            value: 2,
            text: "I am working, not vacationing."
          },
          {
            value: 3,
            text: "This is my life story."
          }
        ]
      },
      {
        q: "Do you like to teach others and share your experience?",
        r: [
          {
            value: 3,
            text:
              "It takes too long to teach or discuss with others, I would rather do it myself."
          },
          {
            value: 1,
            text:
              "Of course! to share knowledge is necessary to have a better team so a better product."
          }
        ]
      },
      {
        q:
          "Do you write quality code and know exactly how the code has to evolve, and have a mental model of overall code structure?",
        r: [
          {
            value: 3,
            text: "Yes."
          },
          {
            value: 2,
            text:
              'Sometimes I can\'t do some things and I have to find a "hack" temporarily.'
          },
          {
            value: 1,
            text: "Not at all, to make sure I define standards and document."
          }
        ]
      },
      {
        q: "Do you write documentation?",
        r: [
          {
            value: 3,
            text:
              "I write at most one design document, and the rest is in the code."
          },
          {
            value: 2,
            text: "My code is self-documented."
          },
          {
            value: 2,
            text:
              "Of course, everything needs the proper documentation to better maintenance."
          }
        ]
      },
      {
        q:
          "Is your life miserable with the process, meetings, training, and other non-value-added activities in your job?",
        r: [
          {
            value: 3,
            text: "Yes, I'm considering looking for another job."
          },
          {
            value: 2,
            text: "Even I don't like that, my life is not miserable."
          },
          {
            value: 1,
            text:
              "No, all of that is part of the job and have some important non-technical values."
          }
        ]
      }
    ];

    /* src/App.svelte generated by Svelte v3.6.7 */

    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.option = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (102:30) 
    function create_if_block_2(ctx) {
    	var h1, t0, t1, a0, t2, t3, i, t4, a1, t6, t7, script;

    	return {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(ctx.result);
    			t1 = space();
    			a0 = element("a");
    			t2 = text("Tweet");
    			t3 = space();
    			i = element("i");
    			t4 = text("The origin of the 10xEngineer Quiz is\n    ");
    			a1 = element("a");
    			a1.textContent = "this tweet of Shekhar Kirani";
    			t6 = text("\n    that was highly rejected by the community. If you don't know about this,\n    just take a look.");
    			t7 = space();
    			script = element("script");
    			script.textContent = "window.twttr = (function(d, s, id) {\n      var js,\n        fjs = d.getElementsByTagName(s)[0],\n        t = window.twttr || {};\n      if (d.getElementById(id)) return t;\n      js = d.createElement(s);\n      js.id = id;\n      js.src = \"https://platform.twitter.com/widgets.js\";\n      fjs.parentNode.insertBefore(js, fjs);\n\n      t._e = [];\n      t.ready = function(f) {\n        t._e.push(f);\n      };\n\n      return t;\n    })(document, \"script\", \"twitter-wjs\");";
    			add_location(h1, file, 102, 2, 2393);
    			attr(a0, "class", "twitter-share-button");
    			attr(a0, "href", "https://twitter.com/intent/tweet");
    			a0.dataset.size = "large";
    			a0.dataset.text = ctx.share;
    			a0.dataset.url = "https://10xengineers.netlify.com/";
    			a0.dataset.hashtags = "10xEngineer";
    			a0.dataset.related = "skirani, cajotafer, cvander, dhh, addyosmani";
    			add_location(a0, file, 103, 2, 2413);
    			attr(a1, "href", "https://twitter.com/skirani/status/1149302828420067328");
    			add_location(a1, file, 116, 4, 2773);
    			attr(i, "class", "spacing svelte-7i4fah");
    			add_location(i, file, 114, 2, 2707);
    			add_location(script, file, 122, 2, 2991);
    		},

    		m: function mount(target, anchor) {
    			insert(target, h1, anchor);
    			append(h1, t0);
    			insert(target, t1, anchor);
    			insert(target, a0, anchor);
    			append(a0, t2);
    			insert(target, t3, anchor);
    			insert(target, i, anchor);
    			append(i, t4);
    			append(i, a1);
    			append(i, t6);
    			insert(target, t7, anchor);
    			insert(target, script, anchor);
    		},

    		p: function update(changed, ctx) {
    			if (changed.result) {
    				set_data(t0, ctx.result);
    			}

    			if (changed.share) {
    				a0.dataset.text = ctx.share;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(h1);
    				detach(t1);
    				detach(a0);
    				detach(t3);
    				detach(i);
    				detach(t7);
    				detach(script);
    			}
    		}
    	};
    }

    // (89:31) 
    function create_if_block_1(ctx) {
    	var h2, t0_value = questions[ctx.count].q, t0, t1, div;

    	var each_value = questions[ctx.count].r;

    	var each_blocks = [];

    	for (var i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	return {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			div = element("div");

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			add_location(h2, file, 89, 2, 2073);
    			attr(div, "class", "btn-container spacing svelte-7i4fah");
    			add_location(div, file, 90, 2, 2105);
    		},

    		m: function mount(target, anchor) {
    			insert(target, h2, anchor);
    			append(h2, t0);
    			insert(target, t1, anchor);
    			insert(target, div, anchor);

    			for (var i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},

    		p: function update(changed, ctx) {
    			if ((changed.count) && t0_value !== (t0_value = questions[ctx.count].q)) {
    				set_data(t0, t0_value);
    			}

    			if (changed.questions || changed.count) {
    				each_value = questions[ctx.count].r;

    				for (var i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(h2);
    				detach(t1);
    				detach(div);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    }

    // (76:2) {#if started === false}
    function create_if_block(ctx) {
    	var p, q, t1, br, t2, t3, h1, t4_value = landing.title, t4, t5, div, button, t6_value = landing.button, t6, dispose;

    	return {
    		c: function create() {
    			p = element("p");
    			q = element("q");
    			q.textContent = "If you have a 10x engineer as part of your first few engineers, you\n      increase the odds of your startup success significantly.";
    			t1 = space();
    			br = element("br");
    			t2 = text("\n    Shekhar Kirani");
    			t3 = space();
    			h1 = element("h1");
    			t4 = text(t4_value);
    			t5 = space();
    			div = element("div");
    			button = element("button");
    			t6 = text(t6_value);
    			attr(q, "cite", "https://twitter.com/skirani/status/1149302828420067328");
    			add_location(q, file, 77, 4, 1653);
    			add_location(br, file, 81, 4, 1869);
    			add_location(p, file, 76, 2, 1645);
    			add_location(h1, file, 84, 2, 1904);
    			attr(button, "class", "svelte-7i4fah");
    			add_location(button, file, 86, 4, 1971);
    			attr(div, "class", "btn-container spacing svelte-7i4fah");
    			add_location(div, file, 85, 2, 1931);
    			dispose = listen(button, "click", ctx.handleStart);
    		},

    		m: function mount(target, anchor) {
    			insert(target, p, anchor);
    			append(p, q);
    			append(p, t1);
    			append(p, br);
    			append(p, t2);
    			insert(target, t3, anchor);
    			insert(target, h1, anchor);
    			append(h1, t4);
    			insert(target, t5, anchor);
    			insert(target, div, anchor);
    			append(div, button);
    			append(button, t6);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(p);
    				detach(t3);
    				detach(h1);
    				detach(t5);
    				detach(div);
    			}

    			dispose();
    		}
    	};
    }

    // (92:4) {#each questions[count].r as option, i}
    function create_each_block(ctx) {
    	var button, t0_value = ctx.option.text, t0, t1, button_data_value_value, button_data_validate_value, dispose;

    	return {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			button.dataset.value = button_data_value_value = ctx.option.value;
    			button.dataset.validate = button_data_validate_value = ctx.option.robot;
    			attr(button, "class", "svelte-7i4fah");
    			add_location(button, file, 92, 4, 2189);
    			dispose = listen(button, "click", ctx.handleClick);
    		},

    		m: function mount(target, anchor) {
    			insert(target, button, anchor);
    			append(button, t0);
    			append(button, t1);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.count) && t0_value !== (t0_value = ctx.option.text)) {
    				set_data(t0, t0_value);
    			}

    			if ((changed.count) && button_data_value_value !== (button_data_value_value = ctx.option.value)) {
    				button.dataset.value = button_data_value_value;
    			}

    			if ((changed.count) && button_data_validate_value !== (button_data_validate_value = ctx.option.robot)) {
    				button.dataset.validate = button_data_validate_value;
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(button);
    			}

    			dispose();
    		}
    	};
    }

    function create_fragment(ctx) {
    	var main, t0, address, t1, a0, t3, a1, t5, a2;

    	function select_block_type(ctx) {
    		if (ctx.started === false) return create_if_block;
    		if (ctx.finished === false) return create_if_block_1;
    		if (ctx.finished === true) return create_if_block_2;
    	}

    	var current_block_type = select_block_type(ctx);
    	var if_block = current_block_type && current_block_type(ctx);

    	return {
    		c: function create() {
    			main = element("main");
    			if (if_block) if_block.c();
    			t0 = space();
    			address = element("address");
    			t1 = text("Created by ");
    			a0 = element("a");
    			a0.textContent = "Cajotafer";
    			t3 = text(" |\n  ");
    			a1 = element("a");
    			a1.textContent = "Twitter";
    			t5 = text(" |\n  ");
    			a2 = element("a");
    			a2.textContent = "Github";
    			add_location(main, file, 74, 0, 1610);
    			attr(a0, "href", "https://cajotafer.com");
    			add_location(a0, file, 144, 13, 3530);
    			attr(a1, "href", "https://twitter.com/cajotafer");
    			add_location(a1, file, 145, 2, 3580);
    			attr(a2, "href", "https://github.com/cajotafer");
    			add_location(a2, file, 146, 2, 3636);
    			attr(address, "class", "spacing svelte-7i4fah");
    			add_location(address, file, 143, 0, 3491);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, main, anchor);
    			if (if_block) if_block.m(main, null);
    			insert(target, t0, anchor);
    			insert(target, address, anchor);
    			append(address, t1);
    			append(address, a0);
    			append(address, t3);
    			append(address, a1);
    			append(address, t5);
    			append(address, a2);
    		},

    		p: function update(changed, ctx) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(changed, ctx);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);
    				if (if_block) {
    					if_block.c();
    					if_block.m(main, null);
    				}
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(main);
    			}

    			if (if_block) if_block.d();

    			if (detaching) {
    				detach(t0);
    				detach(address);
    			}
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { name } = $$props;
      let count = 0;
      let total = 0;
      let started = false;
      let finished = false;
      let result = "";
      let share = "";

      function handleStart() {
        $$invalidate('started', started = true);
      }

      function showResult(total) {
        const MAX = 45;
        let lvl = 9;

        if (total === MAX) lvl = 10;
        else {
          const STEP = 3;
          let reduc = MAX - STEP;
          for (let i = 9; i > 0; i--)
            if (total >= reduc) {
              lvl = i;
              break;
            } else reduc -= STEP;
        }
        switch (lvl) {
          case 10: {
            $$invalidate('result', result = `You are a ${lvl}x Engineer! Apple must hire you!`);
            $$invalidate('share', share = `I'm a ${lvl}x Engineer! I'm preparing my CV! Do the quiz here ->`);
          }
          case 0: {
            $$invalidate('result', result =
              "I'm not sure you are an engineer, you have to effort... trust me");
            $$invalidate('share', share =
              "I think my professional life needs some change. Maybe I am not an engineer. Do the quiz here ->");
          }
          default: {
            $$invalidate('result', result = `You are a ${lvl}x Engineer! That is not enough.`);
            $$invalidate('share', share = `I'm a ${lvl}x Engineer! What a shame. Do the quiz here ->`);
          }
        }

        $$invalidate('finished', finished = true);
      }

      function handleClick(e) {
        e.target.blur();
        $$invalidate('count', count += 1);
        total += parseInt(e.target.dataset.value);
        if (count === questions.length) showResult(total);
      }

    	const writable_props = ['name'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    	};

    	return {
    		name,
    		count,
    		started,
    		finished,
    		result,
    		share,
    		handleStart,
    		handleClick
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["name"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.name === undefined && !('name' in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
