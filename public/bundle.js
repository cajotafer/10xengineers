
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
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
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

    /* src/App.svelte generated by Svelte v3.6.7 */

    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.option = list[i];
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (118:30) 
    function create_if_block_3(ctx) {
    	var h1, t0, t1, div1, a0, t2, t3, div0, a1, t5, i, t6_value = ctx.common.origin[0], t6, t7, a2, t8_value = ctx.common.origin[1], t8, t9, t10_value = ctx.common.origin[2], t10, t11, div2, button, t12_value = ctx.common.try, t12, t13, script0, t15, script1, dispose;

    	return {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text(ctx.result);
    			t1 = space();
    			div1 = element("div");
    			a0 = element("a");
    			t2 = text("Tweet");
    			t3 = text("\n        or  \n      ");
    			div0 = element("div");
    			a1 = element("a");
    			a1.textContent = "Share";
    			t5 = space();
    			i = element("i");
    			t6 = text(t6_value);
    			t7 = space();
    			a2 = element("a");
    			t8 = text(t8_value);
    			t9 = space();
    			t10 = text(t10_value);
    			t11 = space();
    			div2 = element("div");
    			button = element("button");
    			t12 = text(t12_value);
    			t13 = space();
    			script0 = element("script");
    			script0.textContent = "window.twttr = (function(d, s, id) {\n        var js,\n          fjs = d.getElementsByTagName(s)[0],\n          t = window.twttr || {};\n        if (d.getElementById(id)) return t;\n        js = d.createElement(s);\n        js.id = id;\n        js.src = \"https://platform.twitter.com/widgets.js\";\n        fjs.parentNode.insertBefore(js, fjs);\n\n        t._e = [];\n        t.ready = function(f) {\n          t._e.push(f);\n        };\n\n        return t;\n      })(document, \"script\", \"twitter-wjs\");";
    			t15 = space();
    			script1 = element("script");
    			script1.textContent = "(function(d, s, id) {\n        var js,\n          fjs = d.getElementsByTagName(s)[0];\n        if (d.getElementById(id)) return;\n        js = d.createElement(s);\n        js.id = id;\n        js.src =\n          \"https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0\";\n        fjs.parentNode.insertBefore(js, fjs);\n      })(document, \"script\", \"facebook-jssdk\");";
    			add_location(h1, file, 118, 4, 2613);
    			attr(a0, "class", "twitter-share-button");
    			attr(a0, "href", "https://twitter.com/intent/tweet");
    			a0.dataset.size = "large";
    			a0.dataset.text = ctx.share;
    			a0.dataset.url = "https://10xengineers.netlify.com/";
    			a0.dataset.hashtags = "10xEngineer";
    			a0.dataset.related = "skirani, cajotafer, cvander, dhh, addyosmani";
    			add_location(a0, file, 120, 6, 2660);
    			attr(a1, "target", "_blank");
    			attr(a1, "rel", "noopener noreferrer");
    			attr(a1, "href", "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F10xengineers.netlify.com%2F&src=sdkpreparse");
    			attr(a1, "class", "fb-xfbml-parse-ignore");
    			add_location(a1, file, 136, 8, 3177);
    			attr(div0, "class", "fb-share-button");
    			div0.dataset.href = "https://10xengineers.netlify.com/";
    			div0.dataset.layout = "button";
    			div0.dataset.size = "large";
    			add_location(div0, file, 131, 6, 3022);
    			attr(div1, "class", "flex svelte-1z0666y");
    			add_location(div1, file, 119, 4, 2635);
    			attr(a2, "href", "https://twitter.com/skirani/status/1149302828420067328");
    			add_location(a2, file, 147, 6, 3515);
    			attr(i, "class", "spacing svelte-1z0666y");
    			add_location(i, file, 145, 4, 3464);
    			attr(button, "class", "svelte-1z0666y");
    			add_location(button, file, 153, 6, 3704);
    			attr(div2, "class", "btn-container flex spacing svelte-1z0666y");
    			add_location(div2, file, 152, 4, 3657);
    			add_location(script0, file, 155, 4, 3774);
    			add_location(script1, file, 174, 4, 4294);
    			dispose = listen(button, "click", ctx.handleRestart);
    		},

    		m: function mount(target, anchor) {
    			insert(target, h1, anchor);
    			append(h1, t0);
    			insert(target, t1, anchor);
    			insert(target, div1, anchor);
    			append(div1, a0);
    			append(a0, t2);
    			append(div1, t3);
    			append(div1, div0);
    			append(div0, a1);
    			insert(target, t5, anchor);
    			insert(target, i, anchor);
    			append(i, t6);
    			append(i, t7);
    			append(i, a2);
    			append(a2, t8);
    			append(i, t9);
    			append(i, t10);
    			insert(target, t11, anchor);
    			insert(target, div2, anchor);
    			append(div2, button);
    			append(button, t12);
    			insert(target, t13, anchor);
    			insert(target, script0, anchor);
    			insert(target, t15, anchor);
    			insert(target, script1, anchor);
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
    				detach(div1);
    				detach(t5);
    				detach(i);
    				detach(t11);
    				detach(div2);
    				detach(t13);
    				detach(script0);
    				detach(t15);
    				detach(script1);
    			}

    			dispose();
    		}
    	};
    }

    // (106:49) 
    function create_if_block_2(ctx) {
    	var h2, t0_value = ctx.common.robot, t0, t1, form, div, t2, br, t3, input, t4, script, dispose;

    	return {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text(t0_value);
    			t1 = space();
    			form = element("form");
    			div = element("div");
    			t2 = space();
    			br = element("br");
    			t3 = space();
    			input = element("input");
    			t4 = space();
    			script = element("script");
    			add_location(h2, file, 106, 4, 2250);
    			attr(div, "id", "recaptcha");
    			add_location(div, file, 108, 6, 2355);
    			add_location(br, file, 109, 6, 2384);
    			attr(input, "type", "submit");
    			input.value = "Submit";
    			add_location(input, file, 110, 6, 2397);
    			attr(form, "action", "");
    			attr(form, "method", "POST");
    			add_location(form, file, 107, 4, 2278);
    			attr(script, "src", "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit");
    			script.defer = true;
    			add_location(script, file, 112, 4, 2452);
    			dispose = listen(form, "submit", prevent_default(ctx.handleSubmit));
    		},

    		m: function mount(target, anchor) {
    			insert(target, h2, anchor);
    			append(h2, t0);
    			insert(target, t1, anchor);
    			insert(target, form, anchor);
    			append(form, div);
    			append(form, t2);
    			append(form, br);
    			append(form, t3);
    			append(form, input);
    			insert(target, t4, anchor);
    			insert(target, script, anchor);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(h2);
    				detach(t1);
    				detach(form);
    				detach(t4);
    				detach(script);
    			}

    			dispose();
    		}
    	};
    }

    // (94:50) 
    function create_if_block_1(ctx) {
    	var h2, t0_value = ctx.questions[ctx.count].q, t0, t1, div;

    	var each_value = ctx.questions[ctx.count].r;

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
    			add_location(h2, file, 94, 4, 1883);
    			attr(div, "class", "btn-container flex spacing svelte-1z0666y");
    			add_location(div, file, 95, 4, 1917);
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
    			if ((changed.count) && t0_value !== (t0_value = ctx.questions[ctx.count].q)) {
    				set_data(t0, t0_value);
    			}

    			if (changed.questions || changed.count) {
    				each_value = ctx.questions[ctx.count].r;

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

    // (81:2) {#if started === false}
    function create_if_block(ctx) {
    	var p, q, t0_value = ctx.common.quote, t0, t1, br, t2, t3_value = ctx.common.qAuthor, t3, t4, h1, t5_value = ctx.common.title, t5, t6, div, button, t7_value = ctx.common.button, t7, t8, a, t9_value = ctx.common.changeLang, t9, a_href_value, dispose;

    	return {
    		c: function create() {
    			p = element("p");
    			q = element("q");
    			t0 = text(t0_value);
    			t1 = space();
    			br = element("br");
    			t2 = space();
    			t3 = text(t3_value);
    			t4 = space();
    			h1 = element("h1");
    			t5 = text(t5_value);
    			t6 = space();
    			div = element("div");
    			button = element("button");
    			t7 = text(t7_value);
    			t8 = space();
    			a = element("a");
    			t9 = text(t9_value);
    			attr(q, "cite", "https://twitter.com/skirani/status/1149302828420067328");
    			add_location(q, file, 82, 6, 1475);
    			add_location(br, file, 85, 6, 1581);
    			add_location(p, file, 81, 4, 1465);
    			add_location(h1, file, 88, 4, 1624);
    			attr(button, "class", "svelte-1z0666y");
    			add_location(button, file, 90, 6, 1699);
    			attr(div, "class", "btn-container flex spacing svelte-1z0666y");
    			add_location(div, file, 89, 4, 1652);
    			attr(a, "href", a_href_value = ctx.common.changeLangLink);
    			add_location(a, file, 92, 4, 1770);
    			dispose = listen(button, "click", ctx.handleStart);
    		},

    		m: function mount(target, anchor) {
    			insert(target, p, anchor);
    			append(p, q);
    			append(q, t0);
    			append(p, t1);
    			append(p, br);
    			append(p, t2);
    			append(p, t3);
    			insert(target, t4, anchor);
    			insert(target, h1, anchor);
    			append(h1, t5);
    			insert(target, t6, anchor);
    			insert(target, div, anchor);
    			append(div, button);
    			append(button, t7);
    			insert(target, t8, anchor);
    			insert(target, a, anchor);
    			append(a, t9);
    		},

    		p: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach(p);
    				detach(t4);
    				detach(h1);
    				detach(t6);
    				detach(div);
    				detach(t8);
    				detach(a);
    			}

    			dispose();
    		}
    	};
    }

    // (97:6) {#each questions[count].r as option, i}
    function create_each_block(ctx) {
    	var button, t0_value = ctx.option.text, t0, t1, button_data_value_value, button_data_validate_value, dispose;

    	return {
    		c: function create() {
    			button = element("button");
    			t0 = text(t0_value);
    			t1 = space();
    			button.dataset.value = button_data_value_value = ctx.option.value;
    			button.dataset.validate = button_data_validate_value = ctx.option.robot;
    			attr(button, "class", "svelte-1z0666y");
    			add_location(button, file, 97, 8, 2012);
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
    	var div, t0, main, t1, address, t2_value = ctx.common.createdBy, t2, t3, a0, t5, a1, t7, t8_value = ctx.common.contribute, t8, t9, a2;

    	function select_block_type(ctx) {
    		if (ctx.started === false) return create_if_block;
    		if (ctx.finished === false && ctx.robot === false) return create_if_block_1;
    		if (ctx.finished === false && ctx.robot === true) return create_if_block_2;
    		if (ctx.finished === true) return create_if_block_3;
    	}

    	var current_block_type = select_block_type(ctx);
    	var if_block = current_block_type && current_block_type(ctx);

    	return {
    		c: function create() {
    			div = element("div");
    			t0 = space();
    			main = element("main");
    			if (if_block) if_block.c();
    			t1 = space();
    			address = element("address");
    			t2 = text(t2_value);
    			t3 = space();
    			a0 = element("a");
    			a0.textContent = "Cajotafer";
    			t5 = text("\n  |\n  ");
    			a1 = element("a");
    			a1.textContent = "Twitter";
    			t7 = text("\n  | ");
    			t8 = text(t8_value);
    			t9 = space();
    			a2 = element("a");
    			a2.textContent = "Github";
    			attr(div, "id", "fb-root");
    			add_location(div, file, 78, 0, 1407);
    			add_location(main, file, 79, 0, 1428);
    			attr(a0, "href", "https://cajotafer.com");
    			add_location(a0, file, 190, 2, 4754);
    			attr(a1, "href", "https://twitter.com/cajotafer");
    			add_location(a1, file, 192, 2, 4806);
    			attr(a2, "href", "https://github.com/cajotafer/10xengineers");
    			add_location(a2, file, 194, 2, 4884);
    			attr(address, "class", "spacing svelte-1z0666y");
    			add_location(address, file, 188, 0, 4705);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert(target, div, anchor);
    			insert(target, t0, anchor);
    			insert(target, main, anchor);
    			if (if_block) if_block.m(main, null);
    			insert(target, t1, anchor);
    			insert(target, address, anchor);
    			append(address, t2);
    			append(address, t3);
    			append(address, a0);
    			append(address, t5);
    			append(address, a1);
    			append(address, t7);
    			append(address, t8);
    			append(address, t9);
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
    				detach(div);
    				detach(t0);
    				detach(main);
    			}

    			if (if_block) if_block.d();

    			if (detaching) {
    				detach(t1);
    				detach(address);
    			}
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { texts, lang } = $$props;
      const { common, questions, resultText, shareText } = texts;
      let count = 0;
      let total = 0;
      let started = false;
      let finished = false;
      let robot = false;
      let result = "";
      let share = "";

      function handleStart() {
        $$invalidate('started', started = true);
      }

      function handleRestart() {
        $$invalidate('started', started = false);
        $$invalidate('count', count = 0);
        total = 0;
        $$invalidate('finished', finished = false);
      }

      function showResult(total) {
        const MAX = 45;
        const STEP = 3;
        let lvl = 0;

        if (total === MAX) lvl = 10;
        else {
          let reduc = MAX - STEP;
          for (let i = 9; i > 0; i--)
            if (total >= reduc) {
              lvl = i;
              break;
            } else reduc -= STEP;
        }
        $$invalidate('result', result = resultText(lvl));
        $$invalidate('share', share = shareText(lvl));

        $$invalidate('finished', finished = true);
      }

      function handleSubmit() {
        $$invalidate('robot', robot = false);
        $$invalidate('count', count += 1);
        if (count === questions.length) showResult(total);
      }

      function handleClick(e) {
        e.target.blur();
        total += parseInt(e.target.dataset.value);
        if (e.target.dataset.validate === "true") $$invalidate('robot', robot = true);
        else $$invalidate('count', count += 1);
        if (count === questions.length) showResult(total);
      }

    	const writable_props = ['texts', 'lang'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('texts' in $$props) $$invalidate('texts', texts = $$props.texts);
    		if ('lang' in $$props) $$invalidate('lang', lang = $$props.lang);
    	};

    	return {
    		texts,
    		lang,
    		common,
    		questions,
    		count,
    		started,
    		finished,
    		robot,
    		result,
    		share,
    		handleStart,
    		handleRestart,
    		handleSubmit,
    		handleClick
    	};
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["texts", "lang"]);

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.texts === undefined && !('texts' in props)) {
    			console.warn("<App> was created without expected prop 'texts'");
    		}
    		if (ctx.lang === undefined && !('lang' in props)) {
    			console.warn("<App> was created without expected prop 'lang'");
    		}
    	}

    	get texts() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set texts(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lang() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lang(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const common = {
      quote:
        "Si tienes a un 10x engineer como parte de tus primeros ingenieros, incrementas las posibilidades de éxito de tu startup significativamente.",
      qAuthor: "Shekhar Kirani",
      title: "¿Eres un 10x Engineer?",
      button: "Iniciar Test",
      robot: "Sólo debemos asegurarnos 🤖",
      origin: [
        "El origen del 10x Engineers Test is ",
        "este hilo de Shekhar Kirani en twitter",
        " que fue fuertemente rechazado por la comunidad. Si no sabes de que estamos hablando, echa un vistazo."
      ],
      createdBy: "Creado por",
      contribute: "Contribuye en",
      changeLang: "Switch to english 🇬🇧",
      changeLangLink: "https://10xengineers.netlify.com",
      try: "Intentar de nuevo"
    };

    function resultText(lvl) {
      let r = 0;
      switch (lvl) {
        case 10:
          r = `¡Eres un ${lvl}x Engineer! 🤑 ¡Apple ya viene por ti!`;
        case 0:
          r = "No estoy seguro de que seas un ingeniero, créeme... esfuerzate 😒";
        default:
          r = `¡Eres un ${lvl}x Engineer! 🤔 y eso no es suficiente.`;
      }
      return r;
    }

    function shareText(lvl) {
      let r = 0;
      switch (lvl) {
        case 10:
          r = `Soy un ${lvl}x Engineer! 🤑 Apple, ahí voy! Haz el test aquí ->`;
        case 0:
          r =
            "Creo que mi vida necesita algunos cambios. 🤐 Quizás esto no es lo mío. Haz el test aquí ->";
        default:
          r = `Soy un ${lvl}x Engineer! Que pena 🙄. Haz el test aquí ->`;
      }
      return r;
    }

    const questions = [
      {
        q: "¿Qué piensas de las reuniones?",
        r: [
          {
            value: 1,
            text:
              "Las reuniones son necesarias para construir una startup saludable y desarrollar la comunicación."
          },
          {
            value: 3,
            text: "Pienso que son una pérdida de tiempo, se discuten cosas obvias."
          },
          {
            value: 3,
            text:
              'Solo asisto a "Reuniones de personal" convocadas por el gerente para discutir características y estado de producto.'
          }
        ]
      },
      {
        q: "¿Qué tal tus tiempos en la oficina? ¿Eres responsable con eso?",
        r: [
          {
            value: 3,
            text:
              "Mis tiempos son muy irregulares, me gusta programar hasta tarde así que llego tarde a la oficina."
          },
          {
            value: 2,
            text:
              "Mis tiempos a veces son irregulares pero siempre trato de estar a tiempo."
          },
          {
            value: 1,
            text:
              "Mis tiempos son muy regulares, aún cuando programo hasta tarde, conozco mis responsabilidades."
          }
        ]
      },
      {
        q: "¿Cuál de estas opciones te describe mejor?",
        r: [
          {
            value: 3,
            text:
              "Prefiero trabajar cuando hay pocas personas al rededor. No soy visible en reuniones de muchas manos."
          },
          {
            value: 1,
            text:
              "Prefiero trabajar en un ambiente tranquilo. Compartir mis opiniones es importante."
          },
          {
            value: 1,
            text:
              "Me enfoco en mi trabajo (quizás con música) y me gusta compartir opiniones y descubrimientos."
          }
        ]
      },
      {
        q: "Estilo preferido",
        r: [
          {
            value: 2,
            text:
              "El fondo de pantalla de mi laptop normalmente es un paisaje, suelo cambiar los valores por defecto."
          },
          {
            value: 3,
            text:
              "El fondo de pantalla de mi laptop es negro y siempre cambio los valores por defecto."
          },
          {
            value: 1,
            text:
              "No recuerdo el fondo de pantalla de mi laptop, seguramente es el por defecto."
          }
        ]
      },
      {
        q: "¿Tu teclado tiene teclas desgastadas?",
        r: [
          {
            value: 2,
            text: "Si, las teclas a, s, d y w."
          },
          {
            value: 2,
            text: "Si, las teclas q, w, e y r."
          },
          {
            value: 3,
            text: "Si, las teclas i, f y x."
          },
          {
            value: 3,
            text: "No."
          },
          {
            value: 3,
            text: "No, cada año compro una laptop nueva."
          }
        ]
      },
      {
        q: "¿Recuerdas lo que programas?",
        r: [
          {
            value: 1,
            text:
              "Entiendo el código y para mí es fácil encontrar lo que sea pero no conozco cada línea."
          },
          {
            value: 3,
            text:
              "Conozco cada línea de código que está en producción, así que soluciono errores en horas en lugar de días."
          },
          {
            value: 2,
            text:
              "Conozco cada línea de código que está en el entorno de pruebas y así no hay conflictos en producción."
          },
          {
            value: 1,
            text: "No soy un robot.",
            robot: true
          }
        ]
      },
      {
        q: "¿Eres un ingeniero full-stack?",
        r: [
          {
            value: 3,
            text:
              "Si, código es código, no importa si es front-end, back-end, API, base de datos, serverless, etc. Rara vez hago trabajo de UI."
          },
          {
            value: 2,
            text: "Si, además me especializo en ciertas tecnologías."
          },
          {
            value: 1,
            text:
              "No, puedo programar lo que sea pero también hago trabajo de UI... espera, pero front-end y UI están relacionados, ¿o no?"
          },
          {
            value: 1,
            text: "No."
          }
        ]
      },
      {
        q:
          '¿Puedes convertir "pensamientos" a "código" en tu mente y escribirlos de manera iterativa?',
        r: [
          {
            value: 3,
            text: "Si, es lo que siempre hago."
          },
          {
            value: 2,
            text: "Si, si lo que pienso es fácil."
          },
          {
            value: 1,
            text: "No."
          }
        ]
      },
      {
        q:
          "Dado un requerimiento de producto, ¿puedes desarrollarlo en una o dos sesiones de 4 a 6 horas con un café y sin distracciones?",
        r: [
          {
            value: 2,
            text: "Pero ni me gusta el café."
          },
          {
            value: 3,
            text:
              "Por supuesto, estoy haciendo este test justo antes de la segunda sesión."
          },
          {
            value: 3,
            text: "Hagamos que sea una sesión de 3 horas."
          },
          {
            value: 1,
            text: "Obviamente depende de la complejidad del requerimiento."
          }
        ]
      },
      {
        q: "¿Buscas ayuda en la documentación de clases o métodos?",
        r: [
          {
            value: 1,
            text:
              "Si, a pesar de mi conocimiento a veces necesito ayuda, es normal."
          },
          {
            value: 2,
            text: "splice() o slice()?"
          },
          {
            value: 3,
            text:
              "Los sé de memoria. Escribo código tan fácil como escribo español, sin descansos, sin pausa, sólo escribo."
          },
          {
            value: 2,
            text: "¡Te dije que no soy un robot!",
            robot: true
          }
        ]
      },
      {
        q:
          "¿Estás aprendiendo nuevos frameworks, lenguajes primero que cualquiera en la compañía?, ¿Lo lees, configuras y experimentas antes que otros?",
        r: [
          {
            value: 1,
            text: "Sólo los fines de semana si tengo tiempo."
          },
          {
            value: 2,
            text: "Estoy trabajando, no de vacaciones."
          },
          {
            value: 3,
            text: "Eso describe exactamente mi vida."
          }
        ]
      },
      {
        q: "¿Te gusta enseñar a otros y compartir tu experiencia?",
        r: [
          {
            value: 3,
            text:
              "Toma mucho tiempo enseñar o discutir con otros, mejor lo haría yo mismo."
          },
          {
            value: 1,
            text:
              "¡Claro! compartir conocimiento es necesario para que el equipo mejore y el producto final."
          }
        ]
      },
      {
        q:
          "¿Escribes código de calidad, sabes exactamente como debe evolucionar y tienes un modelo mental de toda la estructura general?",
        r: [
          {
            value: 3,
            text: "Si."
          },
          {
            value: 2,
            text:
              "Algunas veces no puedo hacer algo y me veo obligado a usar un truco temporalmente."
          },
          {
            value: 1,
            text: "No del todo, me encargo de definir estándares y documentar."
          }
        ]
      },
      {
        q:
          "¿Cuál de estas opciones define mejor la forma en la que preparas documentación?",
        r: [
          {
            value: 3,
            text:
              "Escribo como máximo un documento de diseño, el resto está en el código."
          },
          {
            value: 2,
            text: "Mi código está auto-documentado."
          },
          {
            value: 2,
            text:
              "Todo necesita una documentación adecuada para un mejor mantenimiento."
          }
        ]
      },
      {
        q:
          "¿Tu vida es miserable con los procesos, reuniones, entrenamientos y otras actividades sin valor añadido en tu trabajo?",
        r: [
          {
            value: 3,
            text: "Si, estoy considerando buscar otro trabajo."
          },
          {
            value: 2,
            text: "Aunque no me gusta, mi vida no es miserable."
          },
          {
            value: 1,
            text:
              "No, todo eso es parte del trabajo y tiene un importante valor no técnico."
          }
        ]
      }
    ];

    const common$1 = {
      quote:
        "If you have a 10x engineer as part of your first few engineers, you increase the odds of your startup success significantly.",
      qAuthor: "Shekhar Kirani",
      title: "Are you a 10x Engineer?",
      button: "Start Test",
      robot: "We just want to make sure 🤖",
      origin: [
        "The origin of the 10x Engineers Test is ",
        "this thread of Shekhar Kirani",
        " that was highly rejected by the community. If you don't know about this,just take a look."
      ],
      createdBy: "Created by",
      contribute: "Contribute on",
      changeLang: "Cambiar a español 🇪🇸",
      changeLangLink: "https://10xengineers.netlify.com/es/",
      try: "Try it again"
    };

    function resultText$1(lvl) {
      let r = 0;
      switch (lvl) {
        case 10:
          r = `You are a ${lvl}x Engineer! 🤑 Apple must hire you!`;
        case 0:
          r = "I'm not sure you are an engineer, you have to effort... trust me 😒";
        default:
          r = `You are a ${lvl}x Engineer! 🤔 That is not enough.`;
      }
      return r;
    }

    function shareText$1(lvl) {
      let r = 0;
      switch (lvl) {
        case 10:
          r = `I'm a ${lvl}x Engineer! 🤑 I'm preparing my CV! Do the test here ->`;
        case 0:
          r =
            "I think my professional life needs some change. 🤐 Maybe I am not an engineer. Do the test here ->";
        default:
          r = `I'm a ${lvl}x Engineer! What a shame 🙄. Do the test here ->`;
      }
      return r;
    }

    const questions$1 = [
      {
        q: "What do you think about meetings?",
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
              "My timing is highly regular, even I like to code late-night, I know my responsibilities."
          }
        ]
      },
      {
        q: "Which one does describe you better?",
        r: [
          {
            value: 3,
            text:
              "I prefer to work when very few folks are around. I am not visible in all-hands meetings."
          },
          {
            value: 1,
            text:
              "I prefer to work in a quiet environment. To share opinions and discoveries is important."
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
              "I don't remember my laptop screen background, surely is the default."
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
            text: "No."
          },
          {
            value: 3,
            text: "No, I buy a new laptop every year."
          }
        ]
      },
      {
        q: "Do you remember your code?",
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
            text: "Yes, even I am specialized in certain technologies."
          },
          {
            value: 1,
            text:
              "No, I can code anything but I also do UI work... wait, but front-end and UI are related, isn't it?."
          },
          {
            value: 1,
            text: "No."
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
          "Given a product feature, can write that entire feature in one or two sittings of 4 to 6 hours with a caffeinated drink without distraction?",
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
              "Yes, even I have great knowledge, sometimes I need some help, it's normal."
          },
          {
            value: 2,
            text: "splice() or slice()?"
          },
          {
            value: 3,
            text:
              "I know it in memory and can recall from memory. I write code at the same ease as writing English. No breaks, no pause, just type."
          },
          {
            value: 2,
            text: "I told you I am not a robot!",
            robot: true
          }
        ]
      },
      {
        q:
          "Are you learning new frameworks, languages ahead of everyone in the company? Do you gobble up, setup, experiment before anyone is getting started?",
        r: [
          {
            value: 1,
            text: "Only on weekends if I have the time."
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
        q: "Which one does describe better the way to write documentation?",
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
            text: "Everything needs the proper documentation to better maintenance."
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

    const lang = location.pathname;

    let common$2 = lang === "/es/" ? common : common$1;
    let questions$2 = lang === "/es/" ? questions : questions$1;
    let resultText$2 = lang === "/es/" ? resultText : resultText$1;
    let shareText$2 = lang === "/es/" ? shareText : shareText$1;

    const app = new App({
      target: document.body,
      props: {
        texts: { common: common$2, questions: questions$2, resultText: resultText$2, shareText: shareText$2 }
      }
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
