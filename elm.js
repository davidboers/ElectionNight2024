(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F3(function(router, toTask, request)
{
	return _Scheduler_binding(function(callback)
	{
		function done(response) {
			callback(toTask(request.expect.a(response)));
		}

		var xhr = new XMLHttpRequest();
		xhr.addEventListener('error', function() { done($elm$http$Http$NetworkError_); });
		xhr.addEventListener('timeout', function() { done($elm$http$Http$Timeout_); });
		xhr.addEventListener('load', function() { done(_Http_toResponse(request.expect.b, xhr)); });
		$elm$core$Maybe$isJust(request.tracker) && _Http_track(router, xhr, request.tracker.a);

		try {
			xhr.open(request.method, request.url, true);
		} catch (e) {
			return done($elm$http$Http$BadUrl_(request.url));
		}

		_Http_configureRequest(xhr, request);

		request.body.a && xhr.setRequestHeader('Content-Type', request.body.a);
		xhr.send(request.body.b);

		return function() { xhr.c = true; xhr.abort(); };
	});
});


// CONFIGURE

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}
	xhr.timeout = request.timeout.a || 0;
	xhr.responseType = request.expect.d;
	xhr.withCredentials = request.allowCookiesFromOtherDomains;
}


// RESPONSES

function _Http_toResponse(toBody, xhr)
{
	return A2(
		200 <= xhr.status && xhr.status < 300 ? $elm$http$Http$GoodStatus_ : $elm$http$Http$BadStatus_,
		_Http_toMetadata(xhr),
		toBody(xhr.response)
	);
}


// METADATA

function _Http_toMetadata(xhr)
{
	return {
		url: xhr.responseURL,
		statusCode: xhr.status,
		statusText: xhr.statusText,
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders())
	};
}


// HEADERS

function _Http_parseHeaders(rawHeaders)
{
	if (!rawHeaders)
	{
		return $elm$core$Dict$empty;
	}

	var headers = $elm$core$Dict$empty;
	var headerPairs = rawHeaders.split('\r\n');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf(': ');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}
	return headers;
}


// EXPECT

var _Http_expect = F3(function(type, toBody, toValue)
{
	return {
		$: 0,
		d: type,
		b: toBody,
		a: toValue
	};
});

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		d: expect.d,
		b: expect.b,
		a: function(x) { return func(expect.a(x)); }
	};
});

function _Http_toDataView(arrayBuffer)
{
	return new DataView(arrayBuffer);
}


// BODY and PARTS

var _Http_emptyBody = { $: 0 };
var _Http_pair = F2(function(a, b) { return { $: 0, a: a, b: b }; });

function _Http_toFormData(parts)
{
	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}
	return formData;
}

var _Http_bytesToBlob = F2(function(mime, bytes)
{
	return new Blob([bytes], { type: mime });
});


// PROGRESS

function _Http_track(router, xhr, tracker)
{
	// TODO check out lengthComputable on loadstart event

	xhr.upload.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Sending({
			sent: event.loaded,
			size: event.total
		}))));
	});
	xhr.addEventListener('progress', function(event) {
		if (xhr.c) { return; }
		_Scheduler_rawSpawn(A2($elm$core$Platform$sendToSelf, router, _Utils_Tuple2(tracker, $elm$http$Http$Receiving({
			received: event.loaded,
			size: event.lengthComputable ? $elm$core$Maybe$Just(event.total) : $elm$core$Maybe$Nothing
		}))));
	});
}



// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$document = _Browser_document;
var $author$project$Office$President = {$: 'President'};
var $author$project$Main$WinnerShare = {$: 'WinnerShare'};
var $author$project$Main$GeorgiaResultFetched = function (a) {
	return {$: 'GeorgiaResultFetched', a: a};
};
var $author$project$Main$ResultFetched = function (a) {
	return {$: 'ResultFetched', a: a};
};
var $author$project$Office$Governor = {$: 'Governor'};
var $author$project$Office$House = {$: 'House'};
var $author$project$Office$Senate = {$: 'Senate'};
var $author$project$Contest$electionDateForLink = '2024-11-05';
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadStatus_ = F2(
	function (a, b) {
		return {$: 'BadStatus_', a: a, b: b};
	});
var $elm$http$Http$BadUrl_ = function (a) {
	return {$: 'BadUrl_', a: a};
};
var $elm$http$Http$GoodStatus_ = F2(
	function (a, b) {
		return {$: 'GoodStatus_', a: a, b: b};
	});
var $elm$http$Http$NetworkError_ = {$: 'NetworkError_'};
var $elm$http$Http$Receiving = function (a) {
	return {$: 'Receiving', a: a};
};
var $elm$http$Http$Sending = function (a) {
	return {$: 'Sending', a: a};
};
var $elm$http$Http$Timeout_ = {$: 'Timeout_'};
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$http$Http$expectStringResponse = F2(
	function (toMsg, toResult) {
		return A3(
			_Http_expect,
			'',
			$elm$core$Basics$identity,
			A2($elm$core$Basics$composeR, toResult, toMsg));
	});
var $elm$core$Result$mapError = F2(
	function (f, result) {
		if (result.$ === 'Ok') {
			var v = result.a;
			return $elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return $elm$core$Result$Err(
				f(e));
		}
	});
var $elm$http$Http$BadBody = function (a) {
	return {$: 'BadBody', a: a};
};
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$http$Http$resolve = F2(
	function (toResult, response) {
		switch (response.$) {
			case 'BadUrl_':
				var url = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadUrl(url));
			case 'Timeout_':
				return $elm$core$Result$Err($elm$http$Http$Timeout);
			case 'NetworkError_':
				return $elm$core$Result$Err($elm$http$Http$NetworkError);
			case 'BadStatus_':
				var metadata = response.a;
				return $elm$core$Result$Err(
					$elm$http$Http$BadStatus(metadata.statusCode));
			default:
				var body = response.b;
				return A2(
					$elm$core$Result$mapError,
					$elm$http$Http$BadBody,
					toResult(body));
		}
	});
var $elm$http$Http$expectJson = F2(
	function (toMsg, decoder) {
		return A2(
			$elm$http$Http$expectStringResponse,
			toMsg,
			$elm$http$Http$resolve(
				function (string) {
					return A2(
						$elm$core$Result$mapError,
						$elm$json$Json$Decode$errorToString,
						A2($elm$json$Json$Decode$decodeString, decoder, string));
				}));
	});
var $elm$http$Http$emptyBody = _Http_emptyBody;
var $elm$http$Http$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$State = F2(
	function (reqs, subs) {
		return {reqs: reqs, subs: subs};
	});
var $elm$http$Http$init = $elm$core$Task$succeed(
	A2($elm$http$Http$State, $elm$core$Dict$empty, _List_Nil));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$http$Http$updateReqs = F3(
	function (router, cmds, reqs) {
		updateReqs:
		while (true) {
			if (!cmds.b) {
				return $elm$core$Task$succeed(reqs);
			} else {
				var cmd = cmds.a;
				var otherCmds = cmds.b;
				if (cmd.$ === 'Cancel') {
					var tracker = cmd.a;
					var _v2 = A2($elm$core$Dict$get, tracker, reqs);
					if (_v2.$ === 'Nothing') {
						var $temp$router = router,
							$temp$cmds = otherCmds,
							$temp$reqs = reqs;
						router = $temp$router;
						cmds = $temp$cmds;
						reqs = $temp$reqs;
						continue updateReqs;
					} else {
						var pid = _v2.a;
						return A2(
							$elm$core$Task$andThen,
							function (_v3) {
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A2($elm$core$Dict$remove, tracker, reqs));
							},
							$elm$core$Process$kill(pid));
					}
				} else {
					var req = cmd.a;
					return A2(
						$elm$core$Task$andThen,
						function (pid) {
							var _v4 = req.tracker;
							if (_v4.$ === 'Nothing') {
								return A3($elm$http$Http$updateReqs, router, otherCmds, reqs);
							} else {
								var tracker = _v4.a;
								return A3(
									$elm$http$Http$updateReqs,
									router,
									otherCmds,
									A3($elm$core$Dict$insert, tracker, pid, reqs));
							}
						},
						$elm$core$Process$spawn(
							A3(
								_Http_toTask,
								router,
								$elm$core$Platform$sendToApp(router),
								req)));
				}
			}
		}
	});
var $elm$http$Http$onEffects = F4(
	function (router, cmds, subs, state) {
		return A2(
			$elm$core$Task$andThen,
			function (reqs) {
				return $elm$core$Task$succeed(
					A2($elm$http$Http$State, reqs, subs));
			},
			A3($elm$http$Http$updateReqs, router, cmds, state.reqs));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$http$Http$maybeSend = F4(
	function (router, desiredTracker, progress, _v0) {
		var actualTracker = _v0.a;
		var toMsg = _v0.b;
		return _Utils_eq(desiredTracker, actualTracker) ? $elm$core$Maybe$Just(
			A2(
				$elm$core$Platform$sendToApp,
				router,
				toMsg(progress))) : $elm$core$Maybe$Nothing;
	});
var $elm$http$Http$onSelfMsg = F3(
	function (router, _v0, state) {
		var tracker = _v0.a;
		var progress = _v0.b;
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$filterMap,
					A3($elm$http$Http$maybeSend, router, tracker, progress),
					state.subs)));
	});
var $elm$http$Http$Cancel = function (a) {
	return {$: 'Cancel', a: a};
};
var $elm$http$Http$cmdMap = F2(
	function (func, cmd) {
		if (cmd.$ === 'Cancel') {
			var tracker = cmd.a;
			return $elm$http$Http$Cancel(tracker);
		} else {
			var r = cmd.a;
			return $elm$http$Http$Request(
				{
					allowCookiesFromOtherDomains: r.allowCookiesFromOtherDomains,
					body: r.body,
					expect: A2(_Http_mapExpect, func, r.expect),
					headers: r.headers,
					method: r.method,
					timeout: r.timeout,
					tracker: r.tracker,
					url: r.url
				});
		}
	});
var $elm$http$Http$MySub = F2(
	function (a, b) {
		return {$: 'MySub', a: a, b: b};
	});
var $elm$http$Http$subMap = F2(
	function (func, _v0) {
		var tracker = _v0.a;
		var toMsg = _v0.b;
		return A2(
			$elm$http$Http$MySub,
			tracker,
			A2($elm$core$Basics$composeR, toMsg, func));
	});
_Platform_effectManagers['Http'] = _Platform_createManager($elm$http$Http$init, $elm$http$Http$onEffects, $elm$http$Http$onSelfMsg, $elm$http$Http$cmdMap, $elm$http$Http$subMap);
var $elm$http$Http$command = _Platform_leaf('Http');
var $elm$http$Http$subscription = _Platform_leaf('Http');
var $elm$http$Http$request = function (r) {
	return $elm$http$Http$command(
		$elm$http$Http$Request(
			{allowCookiesFromOtherDomains: false, body: r.body, expect: r.expect, headers: r.headers, method: r.method, timeout: r.timeout, tracker: r.tracker, url: r.url}));
};
var $elm$http$Http$get = function (r) {
	return $elm$http$Http$request(
		{body: $elm$http$Http$emptyBody, expect: r.expect, headers: _List_Nil, method: 'GET', timeout: $elm$core$Maybe$Nothing, tracker: $elm$core$Maybe$Nothing, url: r.url});
};
var $author$project$Office$GeorgiaQuestions = {$: 'GeorgiaQuestions'};
var $author$project$Office$StateHouse = {$: 'StateHouse'};
var $author$project$Office$StateSenate = {$: 'StateSenate'};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Office$isGeorgia = function (office) {
	return A2(
		$elm$core$List$member,
		office,
		_List_fromArray(
			[$author$project$Office$StateSenate, $author$project$Office$StateHouse, $author$project$Office$GeorgiaQuestions]));
};
var $author$project$Office$AbortionQuestions = {$: 'AbortionQuestions'};
var $author$project$Office$OtherQuestions = {$: 'OtherQuestions'};
var $author$project$Office$RCVQuestions = {$: 'RCVQuestions'};
var $author$project$Office$isReferendum = function (office) {
	return A2(
		$elm$core$List$member,
		office,
		_List_fromArray(
			[$author$project$Office$AbortionQuestions, $author$project$Office$RCVQuestions, $author$project$Office$GeorgiaQuestions, $author$project$Office$OtherQuestions]));
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Basics$not = _Basics_not;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $author$project$Contest$Contest = F8(
	function (id, progress, timestamp, evs, results, calls, meta, counties) {
		return {calls: calls, counties: counties, evs: evs, id: id, meta: meta, progress: progress, results: results, timestamp: timestamp};
	});
var $author$project$Contest$Candidate = F7(
	function (votes, cnd_id, name, short_name, party, winner, isIncumbent) {
		return {cnd_id: cnd_id, isIncumbent: isIncumbent, name: name, party: party, short_name: short_name, votes: votes, winner: winner};
	});
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$json$Json$Decode$map7 = _Json_map7;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$maybe = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder),
				$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing)
			]));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Contest$candidate = A8(
	$elm$json$Json$Decode$map7,
	$author$project$Contest$Candidate,
	A2($elm$json$Json$Decode$field, 'votes', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'party', $elm$json$Json$Decode$string)),
	$elm$json$Json$Decode$succeed(false),
	$elm$json$Json$Decode$succeed(false));
var $author$project$Contest$Call = F5(
	function (caller_id, c_id, subject_id, timestamp, type_) {
		return {c_id: c_id, caller_id: caller_id, subject_id: subject_id, timestamp: timestamp, type_: type_};
	});
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$problemToString = function (p) {
	switch (p.$) {
		case 'Expecting':
			var s = p.a;
			return 'expecting \'' + (s + '\'');
		case 'ExpectingInt':
			return 'expecting int';
		case 'ExpectingHex':
			return 'expecting hex';
		case 'ExpectingOctal':
			return 'expecting octal';
		case 'ExpectingBinary':
			return 'expecting binary';
		case 'ExpectingFloat':
			return 'expecting float';
		case 'ExpectingNumber':
			return 'expecting number';
		case 'ExpectingVariable':
			return 'expecting variable';
		case 'ExpectingSymbol':
			var s = p.a;
			return 'expecting symbol \'' + (s + '\'');
		case 'ExpectingKeyword':
			var s = p.a;
			return 'expecting keyword \'' + (s + '\'');
		case 'ExpectingEnd':
			return 'expecting end';
		case 'UnexpectedChar':
			return 'unexpected char';
		case 'Problem':
			var s = p.a;
			return 'problem ' + s;
		default:
			return 'bad repeat';
	}
};
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndToString = function (deadend) {
	return $rtfeldman$elm_iso8601_date_strings$DeadEnds$problemToString(deadend.problem) + (' at row ' + ($elm$core$String$fromInt(deadend.row) + (', col ' + $elm$core$String$fromInt(deadend.col))));
};
var $elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						$elm$core$List$cons,
						sep,
						A2($elm$core$List$cons, x, rest));
				});
			var spersed = A3($elm$core$List$foldr, step, _List_Nil, tl);
			return A2($elm$core$List$cons, hd, spersed);
		}
	});
var $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndsToString = function (deadEnds) {
	return $elm$core$String$concat(
		A2(
			$elm$core$List$intersperse,
			'; ',
			A2($elm$core$List$map, $rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndToString, deadEnds)));
};
var $elm$json$Json$Decode$fail = _Json_fail;
var $elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var $elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var $elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _v0) {
		var parseA = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parseA(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					var _v2 = callback(a);
					var parseB = _v2.a;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3($elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var $elm$parser$Parser$andThen = $elm$parser$Parser$Advanced$andThen;
var $elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var $elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var $elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var $elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			$elm$parser$Parser$Advanced$AddRight,
			$elm$parser$Parser$Advanced$Empty,
			A4($elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var $elm$parser$Parser$Advanced$end = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				$elm$core$String$length(s.src),
				s.offset) ? A3($elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$end = $elm$parser$Parser$Advanced$end($elm$parser$Parser$ExpectingEnd);
var $elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					$elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5($elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var $elm$parser$Parser$chompWhile = $elm$parser$Parser$Advanced$chompWhile;
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Bad') {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3($elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var $elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2($elm$parser$Parser$Advanced$mapChompedString, $elm$core$Basics$always, parser);
};
var $elm$parser$Parser$getChompedString = $elm$parser$Parser$Advanced$getChompedString;
var $elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var $elm$parser$Parser$Advanced$problem = function (x) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var $elm$parser$Parser$problem = function (msg) {
	return $elm$parser$Parser$Advanced$problem(
		$elm$parser$Parser$Problem(msg));
};
var $elm$core$Basics$round = _Basics_round;
var $elm$parser$Parser$Advanced$succeed = function (a) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var $elm$parser$Parser$succeed = $elm$parser$Parser$Advanced$succeed;
var $elm$core$String$toFloat = _String_toFloat;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs = A2(
	$elm$parser$Parser$andThen,
	function (str) {
		if ($elm$core$String$length(str) <= 9) {
			var _v0 = $elm$core$String$toFloat('0.' + str);
			if (_v0.$ === 'Just') {
				var floatVal = _v0.a;
				return $elm$parser$Parser$succeed(
					$elm$core$Basics$round(floatVal * 1000));
			} else {
				return $elm$parser$Parser$problem('Invalid float: \"' + (str + '\"'));
			}
		} else {
			return $elm$parser$Parser$problem(
				'Expected at most 9 digits, but got ' + $elm$core$String$fromInt(
					$elm$core$String$length(str)));
		}
	},
	$elm$parser$Parser$getChompedString(
		$elm$parser$Parser$chompWhile($elm$core$Char$isDigit)));
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts = F6(
	function (monthYearDayMs, hour, minute, second, ms, utcOffsetMinutes) {
		return $elm$time$Time$millisToPosix((((monthYearDayMs + (((hour * 60) * 60) * 1000)) + (((minute - utcOffsetMinutes) * 60) * 1000)) + (second * 1000)) + ms);
	});
var $elm$parser$Parser$Advanced$map2 = F3(
	function (func, _v0, _v1) {
		var parseA = _v0.a;
		var parseB = _v1.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v2 = parseA(s0);
				if (_v2.$ === 'Bad') {
					var p = _v2.a;
					var x = _v2.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _v2.a;
					var a = _v2.b;
					var s1 = _v2.c;
					var _v3 = parseB(s1);
					if (_v3.$ === 'Bad') {
						var p2 = _v3.a;
						var x = _v3.b;
						return A2($elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _v3.a;
						var b = _v3.b;
						var s2 = _v3.c;
						return A3(
							$elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var $elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$always, keepParser, ignoreParser);
	});
var $elm$parser$Parser$ignorer = $elm$parser$Parser$Advanced$ignorer;
var $elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3($elm$parser$Parser$Advanced$map2, $elm$core$Basics$apL, parseFunc, parseArg);
	});
var $elm$parser$Parser$keeper = $elm$parser$Parser$Advanced$keeper;
var $elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2($elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var step = _v1;
					return step;
				} else {
					var step = _v1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2($elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var $elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3($elm$parser$Parser$Advanced$oneOfHelp, s, $elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var $elm$parser$Parser$oneOf = $elm$parser$Parser$Advanced$oneOf;
var $elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$core$String$append = _String_append;
var $elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var $elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3($elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					$elm$parser$Parser$Advanced$Bad,
					false,
					A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					$elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var $elm$parser$Parser$chompIf = function (isGood) {
	return A2($elm$parser$Parser$Advanced$chompIf, isGood, $elm$parser$Parser$UnexpectedChar);
};
var $elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _v0 = callback(state);
			var parse = _v0.a;
			var _v1 = parse(s0);
			if (_v1.$ === 'Good') {
				var p1 = _v1.a;
				var step = _v1.b;
				var s1 = _v1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3($elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _v1.a;
				var x = _v1.b;
				return A2($elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var $elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return $elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4($elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var $elm$parser$Parser$Advanced$map = F2(
	function (func, _v0) {
		var parse = _v0.a;
		return $elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _v1 = parse(s0);
				if (_v1.$ === 'Good') {
					var p = _v1.a;
					var a = _v1.b;
					var s1 = _v1.c;
					return A3(
						$elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _v1.a;
					var x = _v1.b;
					return A2($elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var $elm$parser$Parser$map = $elm$parser$Parser$Advanced$map;
var $elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var $elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var $elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return $elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return $elm$parser$Parser$Advanced$Done(a);
	}
};
var $elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			$elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt = function (quantity) {
	var helper = function (str) {
		if (_Utils_eq(
			$elm$core$String$length(str),
			quantity)) {
			var _v0 = $elm$core$String$toInt(str);
			if (_v0.$ === 'Just') {
				var intVal = _v0.a;
				return A2(
					$elm$parser$Parser$map,
					$elm$parser$Parser$Done,
					$elm$parser$Parser$succeed(intVal));
			} else {
				return $elm$parser$Parser$problem('Invalid integer: \"' + (str + '\"'));
			}
		} else {
			return A2(
				$elm$parser$Parser$map,
				function (nextChar) {
					return $elm$parser$Parser$Loop(
						A2($elm$core$String$append, str, nextChar));
				},
				$elm$parser$Parser$getChompedString(
					$elm$parser$Parser$chompIf($elm$core$Char$isDigit)));
		}
	};
	return A2($elm$parser$Parser$loop, '', helper);
};
var $elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var $elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var $elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var $elm$parser$Parser$Advanced$token = function (_v0) {
	var str = _v0.a;
	var expecting = _v0.b;
	var progress = !$elm$core$String$isEmpty(str);
	return $elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _v1 = A5($elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _v1.a;
			var newRow = _v1.b;
			var newCol = _v1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				$elm$parser$Parser$Advanced$Bad,
				false,
				A2($elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				$elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var $elm$parser$Parser$Advanced$symbol = $elm$parser$Parser$Advanced$token;
var $elm$parser$Parser$symbol = function (str) {
	return $elm$parser$Parser$Advanced$symbol(
		A2(
			$elm$parser$Parser$Advanced$Token,
			str,
			$elm$parser$Parser$ExpectingSymbol(str)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear = 1970;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay = function (day) {
	return $elm$parser$Parser$problem(
		'Invalid day: ' + $elm$core$String$fromInt(day));
};
var $elm$core$Basics$modBy = _Basics_modBy;
var $elm$core$Basics$neq = _Utils_notEqual;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear = function (year) {
	return (!A2($elm$core$Basics$modBy, 4, year)) && ((!(!A2($elm$core$Basics$modBy, 100, year))) || (!A2($elm$core$Basics$modBy, 400, year)));
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore = function (y1) {
	var y = y1 - 1;
	return (((y / 4) | 0) - ((y / 100) | 0)) + ((y / 400) | 0);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay = 86400000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear = 31536000000;
var $rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay = function (_v0) {
	var year = _v0.a;
	var month = _v0.b;
	var dayInMonth = _v0.c;
	if (dayInMonth < 0) {
		return $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth);
	} else {
		var succeedWith = function (extraMs) {
			var yearMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerYear * (year - $rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear);
			var days = ((month < 3) || (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year))) ? (dayInMonth - 1) : dayInMonth;
			var dayMs = $rtfeldman$elm_iso8601_date_strings$Iso8601$msPerDay * (days + ($rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore(year) - $rtfeldman$elm_iso8601_date_strings$Iso8601$leapYearsBefore($rtfeldman$elm_iso8601_date_strings$Iso8601$epochYear)));
			return $elm$parser$Parser$succeed((extraMs + yearMs) + dayMs);
		};
		switch (month) {
			case 1:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(0);
			case 2:
				return ((dayInMonth > 29) || ((dayInMonth === 29) && (!$rtfeldman$elm_iso8601_date_strings$Iso8601$isLeapYear(year)))) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(2678400000);
			case 3:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(5097600000);
			case 4:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(7776000000);
			case 5:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(10368000000);
			case 6:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(13046400000);
			case 7:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(15638400000);
			case 8:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(18316800000);
			case 9:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(20995200000);
			case 10:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(23587200000);
			case 11:
				return (dayInMonth > 30) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(26265600000);
			case 12:
				return (dayInMonth > 31) ? $rtfeldman$elm_iso8601_date_strings$Iso8601$invalidDay(dayInMonth) : succeedWith(28857600000);
			default:
				return $elm$parser$Parser$problem(
					'Invalid month: \"' + ($elm$core$String$fromInt(month) + '\"'));
		}
	}
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs = A2(
	$elm$parser$Parser$andThen,
	$rtfeldman$elm_iso8601_date_strings$Iso8601$yearMonthDay,
	A2(
		$elm$parser$Parser$keeper,
		A2(
			$elm$parser$Parser$keeper,
			A2(
				$elm$parser$Parser$keeper,
				$elm$parser$Parser$succeed(
					F3(
						function (year, month, day) {
							return _Utils_Tuple3(year, month, day);
						})),
				$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(4)),
			$elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$ignorer,
							$elm$parser$Parser$succeed($elm$core$Basics$identity),
							$elm$parser$Parser$symbol('-')),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
					]))),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$ignorer,
						$elm$parser$Parser$succeed($elm$core$Basics$identity),
						$elm$parser$Parser$symbol('-')),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
				]))));
var $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes = function () {
	var utcOffsetMinutesFromParts = F3(
		function (multiplier, hours, minutes) {
			return (multiplier * (hours * 60)) + minutes;
		});
	return A2(
		$elm$parser$Parser$keeper,
		$elm$parser$Parser$succeed($elm$core$Basics$identity),
		$elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$map,
					function (_v0) {
						return 0;
					},
					$elm$parser$Parser$symbol('Z')),
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							$elm$parser$Parser$succeed(utcOffsetMinutesFromParts),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$map,
										function (_v1) {
											return 1;
										},
										$elm$parser$Parser$symbol('+')),
										A2(
										$elm$parser$Parser$map,
										function (_v2) {
											return -1;
										},
										$elm$parser$Parser$symbol('-'))
									]))),
						$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
					$elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$ignorer,
									$elm$parser$Parser$succeed($elm$core$Basics$identity),
									$elm$parser$Parser$symbol(':')),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
								$elm$parser$Parser$succeed(0)
							]))),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(0),
					$elm$parser$Parser$end)
				])));
}();
var $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601 = A2(
	$elm$parser$Parser$andThen,
	function (datePart) {
		return $elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					$elm$parser$Parser$keeper,
					A2(
						$elm$parser$Parser$keeper,
						A2(
							$elm$parser$Parser$keeper,
							A2(
								$elm$parser$Parser$keeper,
								A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed(
											$rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts(datePart)),
										$elm$parser$Parser$symbol('T')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
								$elm$parser$Parser$oneOf(
									_List_fromArray(
										[
											A2(
											$elm$parser$Parser$keeper,
											A2(
												$elm$parser$Parser$ignorer,
												$elm$parser$Parser$succeed($elm$core$Basics$identity),
												$elm$parser$Parser$symbol(':')),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
											$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)
										]))),
							$elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										$elm$parser$Parser$keeper,
										A2(
											$elm$parser$Parser$ignorer,
											$elm$parser$Parser$succeed($elm$core$Basics$identity),
											$elm$parser$Parser$symbol(':')),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2)),
										$rtfeldman$elm_iso8601_date_strings$Iso8601$paddedInt(2),
										$elm$parser$Parser$succeed(0)
									]))),
						$elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									A2(
									$elm$parser$Parser$keeper,
									A2(
										$elm$parser$Parser$ignorer,
										$elm$parser$Parser$succeed($elm$core$Basics$identity),
										$elm$parser$Parser$symbol('.')),
									$rtfeldman$elm_iso8601_date_strings$Iso8601$fractionsOfASecondInMs),
									$elm$parser$Parser$succeed(0)
								]))),
					A2($elm$parser$Parser$ignorer, $rtfeldman$elm_iso8601_date_strings$Iso8601$utcOffsetInMinutes, $elm$parser$Parser$end)),
					A2(
					$elm$parser$Parser$ignorer,
					$elm$parser$Parser$succeed(
						A6($rtfeldman$elm_iso8601_date_strings$Iso8601$fromParts, datePart, 0, 0, 0, 0, 0)),
					$elm$parser$Parser$end)
				]));
	},
	$rtfeldman$elm_iso8601_date_strings$Iso8601$monthYearDayInMs);
var $elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var $elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3($elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var $elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2($elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var $elm$parser$Parser$Advanced$run = F2(
	function (_v0, src) {
		var parse = _v0.a;
		var _v1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_v1.$ === 'Good') {
			var value = _v1.b;
			return $elm$core$Result$Ok(value);
		} else {
			var bag = _v1.b;
			return $elm$core$Result$Err(
				A2($elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var $elm$parser$Parser$run = F2(
	function (parser, source) {
		var _v0 = A2($elm$parser$Parser$Advanced$run, parser, source);
		if (_v0.$ === 'Ok') {
			var a = _v0.a;
			return $elm$core$Result$Ok(a);
		} else {
			var problems = _v0.a;
			return $elm$core$Result$Err(
				A2($elm$core$List$map, $elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime = function (str) {
	return A2($elm$parser$Parser$run, $rtfeldman$elm_iso8601_date_strings$Iso8601$iso8601, str);
};
var $rtfeldman$elm_iso8601_date_strings$Iso8601$decoder = A2(
	$elm$json$Json$Decode$andThen,
	function (str) {
		var _v0 = $rtfeldman$elm_iso8601_date_strings$Iso8601$toTime(str);
		if (_v0.$ === 'Err') {
			var deadEnds = _v0.a;
			return $elm$json$Json$Decode$fail(
				$rtfeldman$elm_iso8601_date_strings$DeadEnds$deadEndsToString(deadEnds));
		} else {
			var time = _v0.a;
			return $elm$json$Json$Decode$succeed(time);
		}
	},
	$elm$json$Json$Decode$string);
var $elm$json$Json$Decode$map5 = _Json_map5;
var $author$project$Contest$decodeCall = A6(
	$elm$json$Json$Decode$map5,
	$author$project$Contest$Call,
	A2($elm$json$Json$Decode$field, 'callerId', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'contestId', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'subjectId', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'timestamp', $rtfeldman$elm_iso8601_date_strings$Iso8601$decoder),
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$list = _Json_decodeList;
var $elm$json$Json$Decode$map8 = _Json_map8;
var $author$project$Contest$contest = A9(
	$elm$json$Json$Decode$map8,
	$author$project$Contest$Contest,
	A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['progress', 'pct']),
		$elm$json$Json$Decode$float),
	A2($elm$json$Json$Decode$field, 'timestamp', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'evs', $elm$json$Json$Decode$int)),
	A2(
		$elm$json$Json$Decode$field,
		'results',
		$elm$json$Json$Decode$list($author$project$Contest$candidate)),
	A2(
		$elm$json$Json$Decode$field,
		'calls',
		$elm$json$Json$Decode$list($author$project$Contest$decodeCall)),
	$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing),
	$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing));
var $author$project$Contest$summaryDecoder = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['contests']),
	$elm$json$Json$Decode$list($author$project$Contest$contest));
var $author$project$Office$toString = function (office) {
	switch (office.$) {
		case 'President':
			return 'president';
		case 'House':
			return 'house';
		case 'Senate':
			return 'senate';
		case 'Governor':
			return 'governor';
		case 'StateSenate':
			return 'State Senate';
		case 'StateHouse':
			return 'State House';
		case 'AbortionQuestions':
			return 'abortion-questions';
		case 'RCVQuestions':
			return 'rcv-questions';
		case 'GeorgiaQuestions':
			return 'Georgia Ballot Questions';
		default:
			return 'other-questions';
	}
};
var $author$project$Contest$fetchResult = F2(
	function (msg, office) {
		return A2(
			$elm$core$List$member,
			office,
			_List_fromArray(
				[$author$project$Office$President, $author$project$Office$Senate, $author$project$Office$House, $author$project$Office$Governor])) ? $elm$http$Http$get(
			{
				expect: A2($elm$http$Http$expectJson, msg, $author$project$Contest$summaryDecoder),
				url: './temp-2024/' + ($author$project$Contest$electionDateForLink + ('-collection-' + ($author$project$Office$toString(office) + '/summaries.json')))
			}) : (($author$project$Office$isReferendum(office) && (!$author$project$Office$isGeorgia(office))) ? $elm$http$Http$get(
			{
				expect: A2($elm$http$Http$expectJson, msg, $author$project$Contest$summaryDecoder),
				url: './temp-2024/' + ($author$project$Office$toString(office) + '.json')
			}) : $elm$core$Platform$Cmd$none);
	});
var $author$project$Georgia$GeorgiaContest = F6(
	function (name, candidates, votes, precincts_reporting, total_precincts, version) {
		return {candidates: candidates, name: name, precincts_reporting: precincts_reporting, total_precincts: total_precincts, version: version, votes: votes};
	});
var $elm$json$Json$Decode$map6 = _Json_map6;
var $author$project$Georgia$georgiaContest = A7(
	$elm$json$Json$Decode$map6,
	$author$project$Georgia$GeorgiaContest,
	A2($elm$json$Json$Decode$field, 'C', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'CH',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'V',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$int)),
	A2($elm$json$Json$Decode$field, 'PR', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'TP', $elm$json$Json$Decode$int),
	A2($elm$json$Json$Decode$field, 'K', $elm$json$Json$Decode$string));
var $author$project$Georgia$georgiaSummaryDecoder = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['Contests']),
	$elm$json$Json$Decode$list($author$project$Georgia$georgiaContest));
var $author$project$Georgia$fetchResult = function (msg) {
	return $elm$http$Http$get(
		{
			expect: A2($elm$http$Http$expectJson, msg, $author$project$Georgia$georgiaSummaryDecoder),
			url: 'https://results.enr.clarityelections.com/GA/115465/314082/json/sum.json'
		});
};
var $author$project$Main$fetchResult = function (office) {
	return $author$project$Office$isGeorgia(office) ? $author$project$Georgia$fetchResult($author$project$Main$GeorgiaResultFetched) : A2($author$project$Contest$fetchResult, $author$project$Main$ResultFetched, office);
};
var $author$project$Main$init = function (window_width) {
	var msg = $author$project$Main$fetchResult($author$project$Office$President);
	var model = {bq_meta: $elm$core$Maybe$Nothing, county_map_showing: $author$project$Main$WinnerShare, county_selected: $elm$core$Maybe$Nothing, data: _List_Nil, do_cycle: true, err: $elm$core$Maybe$Nothing, filter_state: $elm$core$Maybe$Nothing, map_data: $elm$core$Maybe$Nothing, office_selected: $author$project$Office$President, state_map_showing: $author$project$Main$WinnerShare, window_width: window_width, zoom_coords: $elm$core$Maybe$Nothing};
	return _Utils_Tuple2(model, msg);
};
var $author$project$Main$Cycle = {$: 'Cycle'};
var $author$project$Main$SelectCounty = function (a) {
	return {$: 'SelectCounty', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onMouseMove = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'mousemove');
var $author$project$Main$subscriptions = function (model) {
	var decodeMouseLoc = function () {
		var _v0 = model.county_selected;
		if (_v0.$ === 'Just') {
			var _v1 = _v0.a;
			var county = _v1.a;
			return A3(
				$elm$json$Json$Decode$map2,
				F2(
					function (x, y) {
						return $elm$core$Maybe$Just(
							_Utils_Tuple2(
								county,
								_Utils_Tuple2(x + 10, y - 150)));
					}),
				A2($elm$json$Json$Decode$field, 'clientX', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'clientY', $elm$json$Json$Decode$int));
		} else {
			return $elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing);
		}
	}();
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				A2(
				$elm$time$Time$every,
				10 * 1000,
				$elm$core$Basics$always($author$project$Main$Cycle)),
				$elm$browser$Browser$Events$onMouseMove(
				A2($elm$json$Json$Decode$map, $author$project$Main$SelectCounty, decodeMouseLoc))
			]));
};
var $author$project$Main$PreviousFetched = function (a) {
	return {$: 'PreviousFetched', a: a};
};
var $elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $elm$core$String$fromFloat = _String_fromNumber;
var $author$project$GeoJson$pointToString = function (_v0) {
	var x = _v0.a;
	var y = _v0.b;
	return _Utils_Tuple2(
		$elm$core$String$fromFloat(x) + (' ' + $elm$core$String$fromFloat(y)),
		'');
};
var $author$project$GeoJson$featureToSvg = function (feature) {
	var makeDCoord = function (coord) {
		return 'M ' + A2(
			$elm$core$String$join,
			' L ',
			A2(
				$elm$core$List$map,
				A2($elm$core$Basics$composeR, $author$project$GeoJson$pointToString, $elm$core$Tuple$first),
				coord));
	};
	var _v0 = feature.geometry;
	switch (_v0.$) {
		case 'Point':
			return 'Add';
		case 'LineString':
			var points = _v0.a;
			return makeDCoord(points);
		case 'Polygon':
			var rings = _v0.a;
			return A2(
				$elm$core$String$join,
				' ',
				A2(
					$elm$core$List$map,
					function (ring) {
						return makeDCoord(ring) + ' Z';
					},
					rings));
		default:
			var rings_of_rings = _v0.a;
			return A2(
				$elm$core$String$join,
				' ',
				$elm$core$List$concat(
					A2(
						$elm$core$List$map,
						function (group) {
							return A2($elm$core$List$map, makeDCoord, group);
						},
						rings_of_rings)));
	}
};
var $author$project$Main$BallotQuestionMetaFetched = function (a) {
	return {$: 'BallotQuestionMetaFetched', a: a};
};
var $author$project$BallotQuestionMeta$BallotQuestionMeta = F7(
	function (short_summary, long_summary, yes_tag, no_tag, threshold, total_voter_threshold, competing) {
		return {competing: competing, long_summary: long_summary, no_tag: no_tag, short_summary: short_summary, threshold: threshold, total_voter_threshold: total_voter_threshold, yes_tag: yes_tag};
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $author$project$BallotQuestionMeta$decodeBallotQuestionMeta = A8(
	$elm$json$Json$Decode$map7,
	$author$project$BallotQuestionMeta$BallotQuestionMeta,
	A2($elm$json$Json$Decode$field, 'short-summary', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'long-summary', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'yes-tag', $elm$json$Json$Decode$string)),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'no-tag', $elm$json$Json$Decode$string)),
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$field, 'threshold', $elm$json$Json$Decode$float),
				$elm$json$Json$Decode$succeed(0.5)
			])),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'total-vote-threshold', $elm$json$Json$Decode$float)),
	$elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2($elm$json$Json$Decode$field, 'competing', $elm$json$Json$Decode$bool),
				$elm$json$Json$Decode$succeed(false)
			])));
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$Main$fetchBallotQuestionMeta = function (model) {
	return $elm$http$Http$get(
		{
			expect: A2(
				$elm$http$Http$expectJson,
				$author$project$Main$BallotQuestionMetaFetched,
				A2(
					$elm$json$Json$Decode$field,
					$author$project$Office$toString(model.office_selected),
					$elm$json$Json$Decode$dict($author$project$BallotQuestionMeta$decodeBallotQuestionMeta))),
			url: './ballot-questions.json'
		});
};
var $author$project$Main$CountyFetched = F2(
	function (a, b) {
		return {$: 'CountyFetched', a: a, b: b};
	});
var $author$project$Contest$County = F6(
	function (county_fips, progress, results, swing_from, geo, name) {
		return {county_fips: county_fips, geo: geo, name: name, progress: progress, results: results, swing_from: swing_from};
	});
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Main$countyDecoder = function () {
	var candidatePair = A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$list(
			A3(
				$elm$json$Json$Decode$map2,
				$elm$core$Tuple$pair,
				A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
				A2($elm$json$Json$Decode$field, 'votes', $elm$json$Json$Decode$int))));
	return A7(
		$elm$json$Json$Decode$map6,
		$author$project$Contest$County,
		A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
		A2(
			$elm$json$Json$Decode$at,
			_List_fromArray(
				['progress', 'pct']),
			$elm$json$Json$Decode$float),
		A2($elm$json$Json$Decode$field, 'results', candidatePair),
		$elm$json$Json$Decode$succeed($elm$core$Dict$empty),
		$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing),
		$elm$json$Json$Decode$succeed($elm$core$Maybe$Nothing));
}();
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Main$fetchCounties = F2(
	function (model, c) {
		return $elm$http$Http$get(
			{
				expect: A2(
					$elm$http$Http$expectJson,
					$author$project$Main$CountyFetched(c.id),
					A2(
						$elm$json$Json$Decode$field,
						'counties',
						$elm$json$Json$Decode$list($author$project$Main$countyDecoder))),
				url: './temp-2024/' + ($author$project$Office$toString(model.office_selected) + ('/' + (A3($elm$core$String$replace, ':', '_', c.id) + '/counties.json')))
			});
	});
var $author$project$Main$CountyMapFetched = F2(
	function (a, b) {
		return {$: 'CountyMapFetched', a: a, b: b};
	});
var $author$project$GeoJson$GeoJson = F2(
	function (type_, features) {
		return {features: features, type_: type_};
	});
var $author$project$GeoJson$Feature = F4(
	function (type_, geometry, code, name) {
		return {code: code, geometry: geometry, name: name, type_: type_};
	});
var $author$project$GeoJson$LineString = function (a) {
	return {$: 'LineString', a: a};
};
var $author$project$GeoJson$MultiPolygon = function (a) {
	return {$: 'MultiPolygon', a: a};
};
var $author$project$GeoJson$Point = function (a) {
	return {$: 'Point', a: a};
};
var $author$project$GeoJson$Polygon = function (a) {
	return {$: 'Polygon', a: a};
};
var $author$project$GeoJson$pointCoordinatesDecoder = function () {
	var makePair = function (l) {
		_v0$2:
		while (true) {
			if (l.b) {
				if (l.b.b) {
					if (!l.b.b.b) {
						var a = l.a;
						var _v1 = l.b;
						var b = _v1.a;
						return A2($elm$core$Tuple$pair, a, b);
					} else {
						break _v0$2;
					}
				} else {
					var a = l.a;
					return _Utils_Tuple2(a, 0);
				}
			} else {
				break _v0$2;
			}
		}
		return _Utils_Tuple2(0, 0);
	};
	return A2(
		$elm$json$Json$Decode$map,
		makePair,
		$elm$json$Json$Decode$list($elm$json$Json$Decode$float));
}();
var $author$project$GeoJson$geometryDecoder = $elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			$elm$json$Json$Decode$map,
			$author$project$GeoJson$Point,
			A2($elm$json$Json$Decode$field, 'coordinates', $author$project$GeoJson$pointCoordinatesDecoder)),
			A2(
			$elm$json$Json$Decode$map,
			$author$project$GeoJson$LineString,
			A2(
				$elm$json$Json$Decode$field,
				'coordinates',
				$elm$json$Json$Decode$list($author$project$GeoJson$pointCoordinatesDecoder))),
			A2(
			$elm$json$Json$Decode$map,
			$author$project$GeoJson$Polygon,
			A2(
				$elm$json$Json$Decode$field,
				'coordinates',
				$elm$json$Json$Decode$list(
					$elm$json$Json$Decode$list($author$project$GeoJson$pointCoordinatesDecoder)))),
			A2(
			$elm$json$Json$Decode$map,
			$author$project$GeoJson$MultiPolygon,
			A2(
				$elm$json$Json$Decode$field,
				'coordinates',
				$elm$json$Json$Decode$list(
					$elm$json$Json$Decode$list(
						$elm$json$Json$Decode$list($author$project$GeoJson$pointCoordinatesDecoder)))))
		]));
var $elm$json$Json$Decode$map4 = _Json_map4;
var $author$project$GeoJson$featureDecoder = A5(
	$elm$json$Json$Decode$map4,
	$author$project$GeoJson$Feature,
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'geometry', $author$project$GeoJson$geometryDecoder),
	A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['properties', 'code']),
		$elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$at,
		_List_fromArray(
			['properties', 'name']),
		$elm$json$Json$Decode$string));
var $author$project$GeoJson$geoJsonDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$GeoJson$GeoJson,
	A2($elm$json$Json$Decode$field, 'type', $elm$json$Json$Decode$string),
	A2(
		$elm$json$Json$Decode$field,
		'features',
		$elm$json$Json$Decode$list($author$project$GeoJson$featureDecoder)));
var $author$project$Main$fetchCountyMap = function (fips) {
	return $elm$http$Http$get(
		{
			expect: A2(
				$elm$http$Http$expectJson,
				$author$project$Main$CountyMapFetched(fips),
				$author$project$GeoJson$geoJsonDecoder),
			url: './county-maps/state_counties_' + (fips + '.json')
		});
};
var $author$project$Main$GeorgiaCountyFetched = function (a) {
	return {$: 'GeorgiaCountyFetched', a: a};
};
var $elm_community$list_extra$List$Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var first = list.a;
				var rest = list.b;
				if (predicate(first)) {
					return $elm$core$Maybe$Just(first);
				} else {
					var $temp$predicate = predicate,
						$temp$list = rest;
					predicate = $temp$predicate;
					list = $temp$list;
					continue find;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$zip = $elm$core$List$map2($elm$core$Tuple$pair);
var $author$project$Main$fromGeorgiaCounties = F2(
	function (c, county) {
		var results = $elm$core$Dict$fromList(
			A2(
				$elm_community$list_extra$List$Extra$zip,
				A2(
					$elm$core$List$map,
					function ($) {
						return $.name;
					},
					c.results),
				county.votes));
		var progress = county.precincts_reporting / county.total_precincts;
		return {
			county_fips: '',
			geo: $elm$core$Maybe$Nothing,
			name: $elm$core$Maybe$Just(county.name + ' County'),
			progress: progress,
			results: results,
			swing_from: $elm$core$Dict$empty
		};
	});
var $author$project$Georgia$GeorgiaCounty = F4(
	function (name, votes, precincts_reporting, total_precincts) {
		return {name: name, precincts_reporting: precincts_reporting, total_precincts: total_precincts, votes: votes};
	});
var $elm$core$List$map4 = _List_map4;
var $author$project$Georgia$test = $elm$core$List$map4($author$project$Georgia$GeorgiaCounty);
var $author$project$Georgia$georgiaCounties = A5(
	$elm$json$Json$Decode$map4,
	$author$project$Georgia$test,
	A2(
		$elm$json$Json$Decode$field,
		'P',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'V',
		$elm$json$Json$Decode$list(
			$elm$json$Json$Decode$list($elm$json$Json$Decode$int))),
	A2(
		$elm$json$Json$Decode$field,
		'PX',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$int)),
	A2(
		$elm$json$Json$Decode$field,
		'PY',
		$elm$json$Json$Decode$list($elm$json$Json$Decode$int)));
var $author$project$Main$fromGeorgiaCountiesDecoder = function (c) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$List$map(
			$author$project$Main$fromGeorgiaCounties(c)),
		$author$project$Georgia$georgiaCounties);
};
var $author$project$Main$decodeGeorgiaDetailedContest = function (summary) {
	return A2(
		$elm$json$Json$Decode$andThen,
		function (k) {
			return $elm$json$Json$Decode$maybe(
				function () {
					var _v0 = A2(
						$elm_community$list_extra$List$Extra$find,
						function (v) {
							return _Utils_eq(v.id, k);
						},
						summary);
					if (_v0.$ === 'Just') {
						var c = _v0.a;
						return A3(
							$elm$json$Json$Decode$map2,
							$elm$core$Tuple$pair,
							$elm$json$Json$Decode$succeed(k),
							$author$project$Main$fromGeorgiaCountiesDecoder(c));
					} else {
						return $elm$json$Json$Decode$fail('No contest found in summary with the id: ' + k);
					}
				}());
		},
		A2($elm$json$Json$Decode$field, 'K', $elm$json$Json$Decode$string));
};
var $author$project$Main$decodeGeorgiaDetailedContests = function (summary) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$List$filterMap($elm$core$Basics$identity),
			$elm$json$Json$Decode$list(
				$author$project$Main$decodeGeorgiaDetailedContest(summary))));
};
var $author$project$Main$fetchGeorgiaCounties = function (summary) {
	return $elm$http$Http$get(
		{
			expect: A2(
				$elm$http$Http$expectJson,
				$author$project$Main$GeorgiaCountyFetched,
				A2(
					$elm$json$Json$Decode$field,
					'Contests',
					$author$project$Main$decodeGeorgiaDetailedContests(summary))),
			url: 'https://results.enr.clarityelections.com/GA/115465/314082/json/details.json'
		});
};
var $author$project$Main$MapFetched = function (a) {
	return {$: 'MapFetched', a: a};
};
var $author$project$Main$RaceShape = F3(
	function (abvr, geo, block) {
		return {abvr: abvr, block: block, geo: geo};
	});
var $elm$json$Json$Decode$map3 = _Json_map3;
var $author$project$Main$raceShape = A4(
	$elm$json$Json$Decode$map3,
	$author$project$Main$RaceShape,
	A2($elm$json$Json$Decode$field, 'abvr', $elm$json$Json$Decode$string),
	$elm$json$Json$Decode$maybe(
		A2($elm$json$Json$Decode$field, 'geo', $elm$json$Json$Decode$string)),
	A2(
		$elm$json$Json$Decode$field,
		'block',
		A3(
			$elm$json$Json$Decode$map2,
			$elm$core$Tuple$pair,
			A2($elm$json$Json$Decode$field, 'x', $elm$json$Json$Decode$int),
			A2($elm$json$Json$Decode$field, 'y', $elm$json$Json$Decode$int))));
var $author$project$Main$mapDecoder = $elm$json$Json$Decode$dict($author$project$Main$raceShape);
var $author$project$Main$fetchMap = function (model) {
	return $elm$http$Http$get(
		{
			expect: A2(
				$elm$http$Http$expectJson,
				$author$project$Main$MapFetched,
				A2(
					$elm$json$Json$Decode$field,
					$author$project$Office$toString(model.office_selected),
					$author$project$Main$mapDecoder)),
			url: './map.json'
		});
};
var $author$project$Main$MetaFetched = function (a) {
	return {$: 'MetaFetched', a: a};
};
var $author$project$Contest$CandidateMeta = F4(
	function (name, short_name, party, isIncumbent) {
		return {isIncumbent: isIncumbent, name: name, party: party, short_name: short_name};
	});
var $author$project$Contest$ContestMeta = F7(
	function (office, fips, district, isSpecial, isUncontested, isReferendum, holdingParty) {
		return {district: district, fips: fips, holdingParty: holdingParty, isReferendum: isReferendum, isSpecial: isSpecial, isUncontested: isUncontested, office: office};
	});
var $author$project$Contest$Meta = F2(
	function (candidates, races) {
		return {candidates: candidates, races: races};
	});
var $author$project$Office$officeDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (v) {
		switch (v) {
			case 'president':
				return $elm$json$Json$Decode$succeed($author$project$Office$President);
			case 'house':
				return $elm$json$Json$Decode$succeed($author$project$Office$House);
			case 'senate':
				return $elm$json$Json$Decode$succeed($author$project$Office$Senate);
			case 'governor':
				return $elm$json$Json$Decode$succeed($author$project$Office$Governor);
			case 'State Senate':
				return $elm$json$Json$Decode$succeed($author$project$Office$StateSenate);
			case 'State House':
				return $elm$json$Json$Decode$succeed($author$project$Office$StateHouse);
			case 'abortion-questions':
				return $elm$json$Json$Decode$succeed($author$project$Office$AbortionQuestions);
			case 'rcv-questions':
				return $elm$json$Json$Decode$succeed($author$project$Office$RCVQuestions);
			case 'GeorgiaQuestions':
				return $elm$json$Json$Decode$succeed($author$project$Office$GeorgiaQuestions);
			case 'other-questions':
				return $elm$json$Json$Decode$succeed($author$project$Office$OtherQuestions);
			default:
				return $elm$json$Json$Decode$fail(v);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Contest$metaDecoder = function () {
	var decodeContestMeta = A3(
		$elm$json$Json$Decode$map2,
		$elm$core$Tuple$pair,
		A2($elm$json$Json$Decode$field, 'id', $elm$json$Json$Decode$string),
		A8(
			$elm$json$Json$Decode$map7,
			$author$project$Contest$ContestMeta,
			A2($elm$json$Json$Decode$field, 'office', $author$project$Office$officeDecoder),
			A2($elm$json$Json$Decode$field, 'stateFips', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$maybe(
				A2($elm$json$Json$Decode$field, 'districtNumber', $elm$json$Json$Decode$string)),
			A2($elm$json$Json$Decode$field, 'isSpecial', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'isUncontested', $elm$json$Json$Decode$bool),
			A2($elm$json$Json$Decode$field, 'isBallot', $elm$json$Json$Decode$bool),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$field, 'holdingParty', $elm$json$Json$Decode$string),
						$elm$json$Json$Decode$succeed('oth')
					]))));
	var decodeCandidateMeta = $elm$json$Json$Decode$dict(
		A5(
			$elm$json$Json$Decode$map4,
			$author$project$Contest$CandidateMeta,
			A2($elm$json$Json$Decode$field, 'fullName', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$field, 'shortName', $elm$json$Json$Decode$string),
						A2($elm$json$Json$Decode$field, 'fullName', $elm$json$Json$Decode$string)
					])),
			A2($elm$json$Json$Decode$field, 'party', $elm$json$Json$Decode$string),
			$elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						A2($elm$json$Json$Decode$field, 'isIncumbent', $elm$json$Json$Decode$bool),
						$elm$json$Json$Decode$succeed(false)
					]))));
	return A3(
		$elm$json$Json$Decode$map2,
		$author$project$Contest$Meta,
		A2(
			$elm$json$Json$Decode$map,
			A2(
				$elm$core$Basics$composeL,
				$elm$core$Dict$fromList,
				$elm$core$List$concatMap($elm$core$Dict$toList)),
			$elm$json$Json$Decode$list(
				A2($elm$json$Json$Decode$field, 'candidates', decodeCandidateMeta))),
		A2(
			$elm$json$Json$Decode$map,
			$elm$core$Dict$fromList,
			$elm$json$Json$Decode$list(
				A2($elm$json$Json$Decode$field, 'contest', decodeContestMeta))));
}();
var $author$project$Contest$fetchMeta = F2(
	function (msg, office) {
		return ($author$project$Office$isReferendum(office) && (!$author$project$Office$isGeorgia(office))) ? $elm$http$Http$get(
			{
				expect: A2($elm$http$Http$expectJson, msg, $author$project$Contest$metaDecoder),
				url: './temp-2024/' + ($author$project$Office$toString(office) + '-meta.json')
			}) : $elm$http$Http$get(
			{
				expect: A2($elm$http$Http$expectJson, msg, $author$project$Contest$metaDecoder),
				url: './temp-2024/' + ($author$project$Contest$electionDateForLink + ('-collection-' + ($author$project$Office$toString(office) + '/combined.json')))
			});
	});
var $author$project$Main$fetchMeta = $author$project$Contest$fetchMeta($author$project$Main$MetaFetched);
var $elm$http$Http$expectString = function (toMsg) {
	return A2(
		$elm$http$Http$expectStringResponse,
		toMsg,
		$elm$http$Http$resolve($elm$core$Result$Ok));
};
var $author$project$Contest$fetchPreviousResults = function (msg) {
	return $elm$http$Http$get(
		{
			expect: $elm$http$Http$expectString(msg),
			url: './swing_from.csv'
		});
};
var $author$project$Main$ZoomFetched = function (a) {
	return {$: 'ZoomFetched', a: a};
};
var $author$project$ViewBox$ViewBox = F4(
	function (a, b, c, d) {
		return {$: 'ViewBox', a: a, b: b, c: c, d: d};
	});
var $author$project$ViewBox$zoomDecoder = A2(
	$elm$json$Json$Decode$andThen,
	function (v) {
		var int_list = A2(
			$elm$core$List$map,
			$elm$core$String$toInt,
			A2($elm$core$String$split, ' ', v));
		if ((((((((int_list.b && (int_list.a.$ === 'Just')) && int_list.b.b) && (int_list.b.a.$ === 'Just')) && int_list.b.b.b) && (int_list.b.b.a.$ === 'Just')) && int_list.b.b.b.b) && (int_list.b.b.b.a.$ === 'Just')) && (!int_list.b.b.b.b.b)) {
			var x = int_list.a.a;
			var _v1 = int_list.b;
			var y = _v1.a.a;
			var _v2 = _v1.b;
			var w = _v2.a.a;
			var _v3 = _v2.b;
			var h = _v3.a.a;
			return $elm$json$Json$Decode$succeed(
				A4($author$project$ViewBox$ViewBox, x, y, w, h));
		} else {
			return $elm$json$Json$Decode$fail(v);
		}
	},
	$elm$json$Json$Decode$string);
var $author$project$Main$fetchZoom = function (model) {
	return $elm$http$Http$get(
		{
			expect: A2(
				$elm$http$Http$expectJson,
				$author$project$Main$ZoomFetched,
				A2(
					$elm$json$Json$Decode$field,
					$author$project$Office$toString(model.office_selected),
					$elm$json$Json$Decode$dict($author$project$ViewBox$zoomDecoder))),
			url: './zoom.json'
		});
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3($elm$core$String$slice, 0, -n, string);
	});
var $elm$core$String$trim = _String_trim;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Georgia$fromGeorgia = function (gc) {
	var stripTags = A2(
		$elm$core$Basics$composeR,
		A2($elm$core$String$replace, '(I)', ''),
		A2(
			$elm$core$Basics$composeR,
			A2($elm$core$String$replace, '(Rep)', ''),
			A2(
				$elm$core$Basics$composeR,
				A2($elm$core$String$replace, '(Dem)', ''),
				A2(
					$elm$core$Basics$composeR,
					A2($elm$core$String$replace, '(Lib)', ''),
					$elm$core$String$trim))));
	var progress = gc.precincts_reporting / gc.total_precincts;
	var name = gc.version;
	var k = A2(
		$elm$core$Maybe$withDefault,
		0,
		$elm$core$String$toInt(
			A2($elm$core$String$dropRight, 2, gc.version)));
	var getParty = function (cnd_name) {
		return A2($elm$core$String$contains, '(Rep)', cnd_name) ? $elm$core$Maybe$Just('gop') : (A2($elm$core$String$contains, '(Dem)', cnd_name) ? $elm$core$Maybe$Just('dem') : (A2($elm$core$String$contains, '(Lib)', cnd_name) ? $elm$core$Maybe$Just('lib') : $elm$core$Maybe$Just('oth')));
	};
	var fromGeorgiaCandidate = F2(
		function (cnd_name, votes) {
			return {
				cnd_id: stripTags(cnd_name),
				isIncumbent: A2($elm$core$String$contains, '(I)', cnd_name),
				name: stripTags(cnd_name),
				party: getParty(cnd_name),
				short_name: stripTags(cnd_name),
				votes: votes,
				winner: false
			};
		});
	var results = A3($elm$core$List$map2, fromGeorgiaCandidate, gc.candidates, gc.votes);
	var _v0 = ((k > 500) && (k < 700)) ? _Utils_Tuple2(
		$author$project$Office$StateHouse,
		$elm$core$Maybe$Just(
			$elm$core$String$fromInt(k - 500))) : (((k > 400) && (k < 500)) ? _Utils_Tuple2(
		$author$project$Office$StateSenate,
		$elm$core$Maybe$Just(
			$elm$core$String$fromInt(k - 400))) : ((A2($elm$core$String$contains, 'Statewide Referendum Question', gc.name) || A2($elm$core$String$contains, 'Proposed Constitutional Amendment', gc.name)) ? _Utils_Tuple2($author$project$Office$GeorgiaQuestions, $elm$core$Maybe$Nothing) : _Utils_Tuple2($author$project$Office$President, $elm$core$Maybe$Nothing)));
	var office = _v0.a;
	var district = _v0.b;
	return {
		calls: _List_Nil,
		counties: $elm$core$Maybe$Nothing,
		evs: $elm$core$Maybe$Nothing,
		id: name,
		meta: $elm$core$Maybe$Just(
			{
				district: district,
				fips: '13',
				holdingParty: 'gop',
				isReferendum: $author$project$Office$isReferendum(office),
				isSpecial: false,
				isUncontested: $elm$core$List$length(results) === 1,
				office: office
			}),
		progress: progress,
		results: results,
		timestamp: gc.version
	};
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$String$lines = _String_lines;
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $author$project$Contest$smallPartyCandidates = F2(
	function (default_party, cnd_id) {
		switch (cnd_id) {
			case '69459':
				return 'lib';
			case '895':
				return 'grn';
			case '61513':
				return 'con';
			case '73180':
				return 'psl';
			case '167760':
				return 'swp';
			case '69442':
				return 'sep';
			case '44473':
				return 'lib';
			case '167872':
				return 'lib';
			case '62422':
				return 'lib';
			case '131746':
				return 'grn';
			case '69533':
				return 'lib';
			case '69619':
				return 'lib';
			case '166876':
				return 'grn';
			case '155104':
				return 'con';
			case '166375':
				return 'grn';
			case '166374':
				return 'lib';
			case '167551':
				return 'con';
			case '168217':
				return 'lib';
			case '167853':
				return 'grn';
			case '69655':
				return 'grn';
			case '167867':
				return 'lib';
			case '167868':
				return 'ind';
			case '71777':
				return 'ind';
			case '71492':
				return 'grn';
			case '732':
				return 'lib';
			case '166877':
				return 'lib';
			case '168022':
				return 'lib';
			case '168024':
				return 'grn';
			case '168023':
				return 'con';
			case '167707':
				return 'lib';
			case '167941':
				return 'lib';
			case '131752':
				return 'grn';
			case '130039':
				return 'lib';
			case '68680':
				return 'grn';
			case '132873':
				return 'lib';
			case '1348':
				return 'con';
			case '60050':
				return 'lib';
			case '166841':
				return 'grn';
			case '166842':
				return 'swp';
			case '60901':
				return 'lib';
			case '167810':
				return 'grn';
			case '167811':
				return 'con';
			case '167809':
				return 'lib';
			case '69634':
				return 'lib';
			case '167778':
				return 'lib';
			case '62658':
				return 'lib';
			case '167854':
				return 'grn';
			case '167855':
				return 'grn';
			case '167577':
				return 'grn';
			case '104074':
				return 'lib';
			case '167499':
				return 'lib';
			case '62893':
				return 'lib';
			case '168013':
				return 'lib';
			case '164306':
				return 'lib';
			case '71795':
				return 'con';
			case '168016':
				return 'lib';
			case '167354':
				return 'ind';
			case '71789':
				return 'lib';
			case '168018':
				return 'lib';
			case '71820':
				return 'grn';
			case '167869':
				return 'ind';
			case '71588':
				return 'ind';
			case '167870':
				return 'lib';
			case '166496':
				return 'lib';
			case '166495':
				return 'ind';
			case '167082':
				return 'lib';
			case '112913':
				return 'con';
			case '112486':
				return 'con';
			case '167083':
				return 'lib';
			case '167501':
				return 'lib';
			case '71635':
				return 'lib';
			case '167502':
				return 'lib';
			case '167503':
				return 'lib';
			case '167506':
				return 'lib';
			case '65433':
				return 'lib';
			case '71633':
				return 'lib';
			case '70022':
				return 'lib';
			case '167505':
				return 'lib';
			case '167897':
				return 'ind';
			case '167749':
				return 'lib';
			case '69293':
				return 'lib';
			case '118439':
				return 'ind';
			case '166878':
				return 'lib';
			case '65572':
				return 'lib';
			case '166879':
				return 'lib';
			case '65573':
				return 'grn';
			case '58668':
				return 'lib';
			case '71660':
				return 'lib';
			case '167758':
				return 'lib';
			case '167759':
				return 'con';
			case '130509':
				return 'lib';
			case '71745':
				return 'con';
			case '167761':
				return 'grn';
			case '59834':
				return 'grn';
			case '127269':
				return 'lib';
			case '167762':
				return 'lib';
			case '167763':
				return 'lib';
			case '167764':
				return 'con';
			case '64441':
				return 'grn';
			case '167765':
				return 'lib';
			case '69512':
				return 'lib';
			case '1321':
				return 'grn';
			case '129641':
				return 'grn';
			case '167766':
				return 'lib';
			case '71669':
				return 'con';
			case '167943':
				return 'lib';
			case '65814':
				return 'grn';
			case '167945':
				return 'lib';
			case '167946':
				return 'grn';
			case '131332':
				return 'grn';
			case '167947':
				return 'lib';
			case '60807':
				return 'lib';
			case '167948':
				return 'grn';
			case '130357':
				return 'lib';
			case '167949':
				return 'lib';
			case '65817':
				return 'grn';
			case '50436':
				return 'lib';
			case '167950':
				return 'lib';
			case '167340':
				return 'lib';
			case '166653':
				return 'lib';
			case '64034':
				return 'ind';
			case '166654':
				return 'ind';
			case '166656':
				return 'ind';
			case '132867':
				return 'lib';
			case '166655':
				return 'con';
			case '132597':
				return 'con';
			case '166658':
				return 'lib';
			case '60752':
				return 'con';
			case '166845':
				return 'grn';
			case '166847':
				return 'grn';
			case '71520':
				return 'lib';
			case '58874':
				return 'grn';
			case '134586':
				return 'grn';
			case '134588':
				return 'lib';
			case '166851':
				return 'grn';
			case '67760':
				return 'lib';
			case '166854':
				return 'lib';
			case '51584':
				return 'grn';
			case '166856':
				return 'lib';
			case '166855':
				return 'lib';
			case '166857':
				return 'grn';
			case '71530':
				return 'swp';
			case '166858':
				return 'grn';
			case '166859':
				return 'lib';
			case '166861':
				return 'grn';
			case '166863':
				return 'grn';
			case '166865':
				return 'grn';
			case '166866':
				return 'lib';
			case '34158':
				return 'lib';
			case '166370':
				return 'grn';
			case '166371':
				return 'lib';
			case '136179':
				return 'lib';
			case '68325':
				return 'con';
			case '166372':
				return 'ind';
			case '167550':
				return 'con';
			case '166373':
				return 'lib';
			case '168203':
				return 'ind';
			case '167316':
				return 'con';
			case '167318':
				return 'grn';
			case '64477':
				return 'ind';
			case '167319':
				return 'grn';
			case '167608':
				return 'lib';
			case '69446':
				return 'con';
			case '167757':
				return 'lib';
			case '157656':
				return 'lib';
			case '167507':
				return 'lib';
			case '167508':
				return 'lib';
			case '65546':
				return 'lib';
			case '65015':
				return 'lib';
			case '69627':
				return 'lib';
			case '68829':
				return 'lib';
			case '70425':
				return 'con';
			case '167350':
				return 'lib';
			case '167351':
				return 'ind';
			case '167715':
				return 'grn';
			case '69551':
				return 'con';
			case '62702':
				return 'lib';
			default:
				return default_party;
		}
	});
var $author$project$Contest$mergeMeta = F2(
	function (meta, c) {
		return _Utils_update(
			c,
			{
				meta: A2($elm$core$Dict$get, c.id, meta.races),
				results: A2(
					$elm$core$List$map,
					function (cnd) {
						var _v0 = A2($elm$core$Dict$get, cnd.cnd_id, meta.candidates);
						if (_v0.$ === 'Just') {
							var name = _v0.a.name;
							var short_name = _v0.a.short_name;
							var party = _v0.a.party;
							var isIncumbent = _v0.a.isIncumbent;
							return _Utils_update(
								cnd,
								{
									isIncumbent: isIncumbent,
									name: name,
									party: $elm$core$Maybe$Just(
										A2($author$project$Contest$smallPartyCandidates, party, cnd.cnd_id)),
									short_name: short_name
								});
						} else {
							return cnd;
						}
					},
					c.results)
			});
	});
var $author$project$Contest$mergeMetas = function (meta) {
	return $elm$core$List$map(
		$author$project$Contest$mergeMeta(meta));
};
var $author$project$Contest$officeIs = F2(
	function (office, c) {
		return A2(
			$elm$core$Maybe$withDefault,
			false,
			A2(
				$elm$core$Maybe$map,
				function (v) {
					return _Utils_eq(v.office, office);
				},
				c.meta));
	});
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Main$skipState = F2(
	function (model, c) {
		var _v0 = c.meta;
		if (_v0.$ === 'Just') {
			var meta = _v0.a;
			if ((!$elm$core$List$sum(
				A2(
					$elm$core$List$map,
					function ($) {
						return $.votes;
					},
					c.results))) || meta.isUncontested) {
				return true;
			} else {
				if (A2(
					$elm$core$List$member,
					model.office_selected,
					_List_fromArray(
						[$author$project$Office$StateSenate, $author$project$Office$StateHouse]))) {
					var _v1 = model.filter_state;
					if (_v1.$ === 'Just') {
						var fips = _v1.a;
						return !A2(
							$elm$core$List$member,
							fips,
							A2(
								$elm$core$List$filterMap,
								function ($) {
									return $.name;
								},
								A2($elm$core$Maybe$withDefault, _List_Nil, c.counties)));
					} else {
						return false;
					}
				} else {
					var _v2 = model.filter_state;
					if (_v2.$ === 'Just') {
						var fips = _v2.a;
						return !_Utils_eq(fips, meta.fips);
					} else {
						return false;
					}
				}
			}
		} else {
			return true;
		}
	});
var $author$project$Main$compareContests = F2(
	function (a, b) {
		var _v0 = _Utils_Tuple2(a.meta, b.meta);
		if (_v0.a.$ === 'Nothing') {
			var _v1 = _v0.a;
			return $elm$core$Basics$LT;
		} else {
			if (_v0.b.$ === 'Nothing') {
				var _v2 = _v0.b;
				return $elm$core$Basics$GT;
			} else {
				var a_meta = _v0.a.a;
				var b_meta = _v0.b.a;
				var compareSpecial = function () {
					var _v6 = _Utils_Tuple2(a_meta.isSpecial, b_meta.isSpecial);
					_v6$2:
					while (true) {
						if (_v6.a) {
							if (!_v6.b) {
								return $elm$core$Basics$GT;
							} else {
								break _v6$2;
							}
						} else {
							if (_v6.b) {
								return $elm$core$Basics$LT;
							} else {
								break _v6$2;
							}
						}
					}
					return $elm$core$Basics$EQ;
				}();
				var _v3 = A2($elm$core$Basics$compare, a_meta.fips, b_meta.fips);
				switch (_v3.$) {
					case 'LT':
						return $elm$core$Basics$LT;
					case 'GT':
						return $elm$core$Basics$GT;
					default:
						var _v4 = _Utils_Tuple2(
							A2($elm$core$Maybe$andThen, $elm$core$String$toInt, a_meta.district),
							A2($elm$core$Maybe$andThen, $elm$core$String$toInt, b_meta.district));
						if ((_v4.a.$ === 'Just') && (_v4.b.$ === 'Just')) {
							var district_a = _v4.a.a;
							var district_b = _v4.b.a;
							var _v5 = A2($elm$core$Basics$compare, district_a, district_b);
							switch (_v5.$) {
								case 'LT':
									return $elm$core$Basics$LT;
								case 'GT':
									return $elm$core$Basics$GT;
								default:
									return compareSpecial;
							}
						} else {
							return compareSpecial;
						}
				}
			}
		}
	});
var $elm$core$List$sortWith = _List_sortWith;
var $author$project$Main$sortSummary = function (summary) {
	return A2($elm$core$List$sortWith, $author$project$Main$compareContests, summary);
};
var $author$project$Main$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'FetchData':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'SelectOffice':
				var office = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{filter_state: $elm$core$Maybe$Nothing, office_selected: office}),
					$author$project$Main$fetchResult(office));
			case 'ResultFetched':
				if (msg.a.$ === 'Ok') {
					var results = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{data: results}),
						(!$elm$core$List$sum(
							A2(
								$elm$core$List$map,
								function ($) {
									return $.votes;
								},
								A2(
									$elm$core$List$concatMap,
									function ($) {
										return $.results;
									},
									results)))) ? $elm$core$Platform$Cmd$none : $author$project$Main$fetchMeta(model.office_selected));
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$author$project$Main$fetchMeta(model.office_selected));
				}
			case 'GeorgiaResultFetched':
				if (msg.a.$ === 'Ok') {
					var results = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								data: A2(
									$elm$core$List$filter,
									$author$project$Contest$officeIs(model.office_selected),
									A2($elm$core$List$map, $author$project$Georgia$fromGeorgia, results))
							}),
						A2(
							$elm$core$List$member,
							model.office_selected,
							_List_fromArray(
								[$author$project$Office$GeorgiaQuestions])) ? $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$fetchMap(model),
									$author$project$Main$fetchBallotQuestionMeta(model)
								])) : (A2(
							$elm$core$List$member,
							model.office_selected,
							_List_fromArray(
								[$author$project$Office$StateSenate, $author$project$Office$StateHouse])) ? $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$fetchMap(model),
									$author$project$Main$fetchZoom(model)
								])) : $author$project$Main$fetchMap(model)));
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'MetaFetched':
				if (msg.a.$ === 'Ok') {
					var meta = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								data: $author$project$Main$sortSummary(
									A2($author$project$Contest$mergeMetas, meta, model.data))
							}),
						A2(
							$elm$core$List$member,
							model.office_selected,
							_List_fromArray(
								[$author$project$Office$AbortionQuestions, $author$project$Office$RCVQuestions, $author$project$Office$OtherQuestions])) ? $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$fetchMap(model),
									$author$project$Main$fetchBallotQuestionMeta(model)
								])) : (_Utils_eq(model.office_selected, $author$project$Office$House) ? $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									$author$project$Main$fetchMap(model),
									$author$project$Main$fetchZoom(model)
								])) : $author$project$Main$fetchMap(model)));
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'MapFetched':
				if (msg.a.$ === 'Ok') {
					var map_data = msg.a.a;
					var new_model = _Utils_update(
						model,
						{
							map_data: $elm$core$Maybe$Just(map_data)
						});
					return _Utils_Tuple2(
						new_model,
						_Utils_eq(model.office_selected, $author$project$Office$House) ? $elm$core$Platform$Cmd$none : ($author$project$Office$isGeorgia(model.office_selected) ? $author$project$Main$fetchGeorgiaCounties(new_model.data) : $elm$core$Platform$Cmd$batch(
							A2(
								$elm$core$List$cons,
								$author$project$Contest$fetchPreviousResults($author$project$Main$PreviousFetched),
								A2(
									$elm$core$List$map,
									$author$project$Main$fetchCounties(model),
									new_model.data)))));
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ZoomFetched':
				if (msg.a.$ === 'Ok') {
					var zoom_coords = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								zoom_coords: $elm$core$Maybe$Just(zoom_coords)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'CountyFetched':
				if (msg.b.$ === 'Ok') {
					var c_id = msg.a;
					var counties = msg.b.a;
					var updateContest = function (data) {
						if (data.b) {
							var x = data.a;
							var xs = data.b;
							return _Utils_eq(x.id, c_id) ? A2(
								$elm$core$List$cons,
								_Utils_update(
									x,
									{
										counties: $elm$core$Maybe$Just(counties)
									}),
								xs) : A2(
								$elm$core$List$cons,
								x,
								updateContest(xs));
						} else {
							return _List_Nil;
						}
					};
					var fips = A2(
						$elm$core$Maybe$withDefault,
						'00',
						A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.fips;
							},
							A2(
								$elm$core$Maybe$andThen,
								function ($) {
									return $.meta;
								},
								A2(
									$elm_community$list_extra$List$Extra$find,
									function (v) {
										return _Utils_eq(v.id, c_id);
									},
									model.data))));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								data: updateContest(model.data)
							}),
						$author$project$Main$fetchCountyMap(fips));
				} else {
					var e = msg.b.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'GeorgiaCountyFetched':
				if (msg.a.$ === 'Ok') {
					var counties_set = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								data: A2(
									$elm$core$List$map,
									function (c) {
										return _Utils_update(
											c,
											{
												counties: A2($elm$core$Dict$get, c.id, counties_set)
											});
									},
									model.data)
							}),
						$author$project$Main$fetchCountyMap('13'));
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'CountyMapFetched':
				if (msg.b.$ === 'Ok') {
					var fips = msg.a;
					var geojson = msg.b.a;
					var addGeo = function (county) {
						var feature = A2(
							$elm_community$list_extra$List$Extra$find,
							function (v) {
								return _Utils_eq(v.code, county.county_fips) || _Utils_eq(
									$elm$core$Maybe$Just(v.name),
									county.name);
							},
							geojson.features);
						return _Utils_update(
							county,
							{
								geo: A2($elm$core$Maybe$map, $author$project$GeoJson$featureToSvg, feature),
								name: A2(
									$elm$core$Maybe$map,
									function ($) {
										return $.name;
									},
									feature)
							});
					};
					var updateContest = function (data) {
						updateContest:
						while (true) {
							if (data.b) {
								var x = data.a;
								var xs = data.b;
								var _v13 = x.meta;
								if (_v13.$ === 'Just') {
									var meta = _v13.a;
									return _Utils_eq(meta.fips, fips) ? A2(
										$elm$core$List$cons,
										_Utils_update(
											x,
											{
												counties: A2(
													$elm$core$Maybe$map,
													$elm$core$List$map(addGeo),
													x.counties)
											}),
										updateContest(xs)) : A2(
										$elm$core$List$cons,
										x,
										updateContest(xs));
								} else {
									var $temp$data = xs;
									data = $temp$data;
									continue updateContest;
								}
							} else {
								return _List_Nil;
							}
						}
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								data: updateContest(model.data)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					if (msg.b.a.$ === 'BadBody') {
						var c_id = msg.a;
						var str = msg.b.a.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just(
										$elm$http$Http$BadBody(str + (' ' + c_id)))
								}),
							$elm$core$Platform$Cmd$none);
					} else {
						var e = msg.b.a;
						return _Utils_Tuple2(
							_Utils_update(
								model,
								{
									err: $elm$core$Maybe$Just(e)
								}),
							$elm$core$Platform$Cmd$none);
					}
				}
			case 'BallotQuestionMetaFetched':
				if (msg.a.$ === 'Ok') {
					var bq_meta = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								bq_meta: $elm$core$Maybe$Just(bq_meta)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'PreviousFetched':
				if (msg.a.$ === 'Ok') {
					var txt = msg.a.a;
					var select_line = F3(
						function (c_id, county_fips, line) {
							if (((((((((line.b && line.b.b) && line.b.b.b) && line.b.b.b.b) && line.b.b.b.b.b) && line.b.b.b.b.b.b) && line.b.b.b.b.b.b.b) && line.b.b.b.b.b.b.b.b) && line.b.b.b.b.b.b.b.b.b) && (!line.b.b.b.b.b.b.b.b.b.b)) {
								var _v4 = line.b;
								var c_id_1 = _v4.a;
								var _v5 = _v4.b;
								var _v6 = _v5.b;
								var county_fips_1 = _v6.a;
								var _v7 = _v6.b;
								var _v8 = _v7.b;
								var _v9 = _v8.b;
								var cnd_id = _v9.a;
								var _v10 = _v9.b;
								var _v11 = _v10.b;
								var votes = _v11.a;
								return (_Utils_eq(c_id, c_id_1) && _Utils_eq(county_fips, county_fips_1)) ? A2(
									$elm$core$Maybe$map,
									function (votes_f) {
										return _Utils_Tuple2(cnd_id, votes_f);
									},
									$elm$core$String$toInt(votes)) : $elm$core$Maybe$Nothing;
							} else {
								return $elm$core$Maybe$Nothing;
							}
						});
					var csv = A2(
						$elm$core$List$filter,
						A2(
							$elm$core$Basics$composeL,
							A2(
								$elm$core$Basics$composeL,
								$elm$core$Basics$eq(
									$author$project$Office$toString(model.office_selected)),
								$elm$core$Maybe$withDefault('')),
							$elm$core$List$head),
						A2(
							$elm$core$List$map,
							$elm$core$String$split(','),
							$elm$core$String$lines(txt)));
					var insertCountyResults = F2(
						function (c_id, county) {
							var _v2 = A2(
								$elm$core$List$filterMap,
								A2(select_line, c_id, county.county_fips),
								csv);
							if (!_v2.b) {
								return county;
							} else {
								var selected_lines = _v2;
								return _Utils_update(
									county,
									{
										swing_from: $elm$core$Dict$fromList(selected_lines)
									});
							}
						});
					var insertContestResults = function (c) {
						return _Utils_update(
							c,
							{
								counties: A2(
									$elm$core$Maybe$map,
									$elm$core$List$map(
										insertCountyResults(c.id)),
									c.counties)
							});
					};
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								data: A2($elm$core$List$map, insertContestResults, model.data)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var e = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								err: $elm$core$Maybe$Just(e)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'CountyMapShowing':
				var new_showing = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{county_map_showing: new_showing}),
					$elm$core$Platform$Cmd$none);
			case 'StateMapShowing':
				var new_showing = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{state_map_showing: new_showing}),
					$elm$core$Platform$Cmd$none);
			case 'JumpToRace':
				var c_id = msg.a;
				var bringToFront = function (data) {
					if (data.b) {
						var x = data.a;
						var xs = data.b;
						return _Utils_eq(x.id, c_id) ? A2($elm$core$List$cons, x, xs) : _Utils_ap(
							bringToFront(xs),
							_List_fromArray(
								[x]));
					} else {
						return data;
					}
				};
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							data: bringToFront(model.data)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SelectState':
				var fips = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{filter_state: fips}),
					$elm$core$Platform$Cmd$none);
			case 'SelectCounty':
				var county_selected = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							county_selected: county_selected,
							do_cycle: _Utils_eq(county_selected, $elm$core$Maybe$Nothing)
						}),
					$elm$core$Platform$Cmd$none);
			case 'DoCycle':
				var do_cycle = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{do_cycle: do_cycle}),
					$elm$core$Platform$Cmd$none);
			default:
				var cycle = function (data) {
					if (data.b) {
						var x = data.a;
						var xs = data.b;
						return A2($author$project$Main$skipState, model, x) ? _Utils_ap(
							cycle(xs),
							_List_fromArray(
								[x])) : _Utils_ap(
							xs,
							_List_fromArray(
								[x]));
					} else {
						return data;
					}
				};
				return model.do_cycle ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							data: cycle(model.data)
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Main$CountyMapShowing = function (a) {
	return {$: 'CountyMapShowing', a: a};
};
var $author$project$Main$StateMapShowing = function (a) {
	return {$: 'StateMapShowing', a: a};
};
var $author$project$Main$Bar = F4(
	function (pct_width, color, text_, text_align) {
		return {color: color, pct_width: pct_width, text_: text_, text_align: text_align};
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$align = $elm$html$Html$Attributes$stringProperty('align');
var $elm$html$Html$br = _VirtualDom_node('br');
var $elm$core$List$sortBy = _List_sortBy;
var $author$project$Contest$contestWinner = function (c) {
	var _v0 = A2(
		$elm$core$Maybe$map,
		function ($) {
			return $.isUncontested;
		},
		c.meta);
	if ((_v0.$ === 'Just') && _v0.a) {
		var _v1 = c.results;
		if (_v1.b && (!_v1.b.b)) {
			var x = _v1.a;
			return $elm$core$Maybe$Just(x);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	} else {
		var winners = function () {
			var _v3 = $elm$core$List$head(
				$elm$core$List$reverse(
					A2(
						$elm$core$List$sortBy,
						function ($) {
							return $.votes;
						},
						c.results)));
			if (_v3.$ === 'Just') {
				var a = _v3.a;
				return _List_fromArray(
					[a]);
			} else {
				return _List_Nil;
			}
		}();
		if (winners.b && (!winners.b.b)) {
			var x = winners.a;
			return $elm$core$Maybe$Just(x);
		} else {
			return $elm$core$Maybe$Nothing;
		}
	}
};
var $author$project$ShadePalettes$dem_color_dark = '#1a4e92';
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$String$fromList = _String_fromList;
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $author$project$DisplayNumber$displayNumber = function (n) {
	var breakUp = function (part) {
		if (!part.b) {
			return _List_Nil;
		} else {
			return A2(
				$elm$core$List$cons,
				A2($elm$core$List$take, 3, part),
				breakUp(
					A2($elm$core$List$drop, 3, part)));
		}
	};
	return $elm$core$String$fromList(
		$elm$core$List$reverse(
			$elm$core$List$concat(
				A2(
					$elm$core$List$intersperse,
					_List_fromArray(
						[
							_Utils_chr(',')
						]),
					breakUp(
						$elm$core$List$reverse(
							$elm$core$String$toList(
								$elm$core$String$fromInt(n))))))));
};
var $author$project$DisplayNumber$displayPct = F2(
	function (n, d) {
		return (!d) ? '-' : A2(
			$elm$core$String$left,
			4,
			$elm$core$String$fromFloat((n / d) * 100));
	});
var $author$project$DisplayNumber$displayPctRnd = F2(
	function (n, d) {
		return (!d) ? '0%' : ($elm$core$String$fromInt(
			$elm$core$Basics$round((n / d) * 100)) + '%');
	});
var $elm$html$Html$div = _VirtualDom_node('div');
var $author$project$ShadePalettes$gop_color_dark = '#96222c';
var $author$project$ShadePalettes$partyColor = function (party) {
	switch (party) {
		case 'gop':
			return '#cf222c';
		case 'dem':
			return '#1a80c4';
		case 'lib':
			return '#fed105';
		case 'grn':
			return '#17aa5c';
		case 'psl':
			return '#ff0000';
		case 'asp':
			return '#F37120';
		case 'con':
			return '#A356DE';
		case 'phb':
			return '#FF00FF';
		case 'soc':
			return '#CD3700';
		case 'swp':
			return '#AA0000';
		case 'sep':
			return '#D30101';
		default:
			return '#cccccc';
	}
};
var $elm$html$Html$span = _VirtualDom_node('span');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$core$String$toUpper = _String_toUpper;
var $author$project$Main$aggr = F2(
	function (model, summary) {
		var und_color = '#ffffff';
		var oth_color = $author$project$ShadePalettes$partyColor('oth');
		var gop_color = $author$project$ShadePalettes$partyColor('gop');
		var dem_color = $author$project$ShadePalettes$partyColor('dem');
		var party_line = F2(
			function (dem_displ, gop_displ) {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'font-weight', 'bold'),
							A2($elm$html$Html$Attributes$style, 'padding', '5px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'color', dem_color),
									A2($elm$html$Html$Attributes$style, 'width', '50%')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(dem_displ)
								])),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
									A2($elm$html$Html$Attributes$style, 'color', gop_color),
									A2($elm$html$Html$Attributes$style, 'width', '50%')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(gop_displ)
								]))
						]));
			});
		var bar = function (b) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'width', b.pct_width),
						A2($elm$html$Html$Attributes$style, 'background-color', b.color),
						A2($elm$html$Html$Attributes$style, 'height', 'inherit')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'text-align', b.text_align),
								A2($elm$html$Html$Attributes$style, 'color', 'white'),
								A2($elm$html$Html$Attributes$style, 'font-size', '25px'),
								A2($elm$html$Html$Attributes$style, 'padding', '10px 5px')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(b.text_)
							]))
					]));
		};
		var bars = F2(
			function (bar_list, maj) {
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'border', '1px solid black'),
							A2($elm$html$Html$Attributes$style, 'height', '50px'),
							A2($elm$html$Html$Attributes$style, 'display', 'flex')
						]),
					_Utils_ap(
						A2($elm$core$List$map, bar, bar_list),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'display', 'block'),
										A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
										A2($elm$html$Html$Attributes$style, 'left', '50%'),
										A2($elm$html$Html$Attributes$style, 'height', 'inherit')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'height', 'inherit'),
												A2($elm$html$Html$Attributes$style, 'border-left', '2px dashed black')
											]),
										_List_Nil),
										A2(
										$elm$html$Html$span,
										_List_fromArray(
											[
												A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
												A2($elm$html$Html$Attributes$style, 'display', 'block'),
												A2($elm$html$Html$Attributes$style, 'padding-top', '5px'),
												A2($elm$html$Html$Attributes$style, 'margin-left', '-80%'),
												A2($elm$html$Html$Attributes$style, 'height', 'normal')
											]),
										_List_fromArray(
											[
												function () {
												var _v9 = model.office_selected;
												if (_v9.$ === 'Governor') {
													return $elm$html$Html$text('');
												} else {
													return $elm$html$Html$text(
														$elm$core$String$fromInt(maj) + ' to win');
												}
											}()
											]))
									]))
							])));
			});
		var _v0 = model.office_selected;
		switch (_v0.$) {
			case 'GeorgiaQuestions':
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil)
						]));
			case 'AbortionQuestions':
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil)
						]));
			case 'RCVQuestions':
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil)
						]));
			case 'OtherQuestions':
				return A2(
					$elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil),
							A2($elm$html$Html$br, _List_Nil, _List_Nil)
						]));
			case 'President':
				var total_votes = $elm$core$List$sum(
					A2(
						$elm$core$List$map,
						function ($) {
							return $.votes;
						},
						A2(
							$elm$core$List$concatMap,
							function ($) {
								return $.results;
							},
							summary)));
				var total_evs = 538;
				var isWinner = F2(
					function (pty, c) {
						var _v1 = $author$project$Contest$contestWinner(c);
						if (_v1.$ === 'Just') {
							var a = _v1.a;
							var winner_party = A2($elm$core$Maybe$withDefault, 'oth', a.party);
							return _Utils_eq(pty, winner_party);
						} else {
							return false;
						}
					});
				var count_evs = function (pty) {
					return $elm$core$List$sum(
						A2(
							$elm$core$List$filterMap,
							function ($) {
								return $.evs;
							},
							A2(
								$elm$core$List$filter,
								isWinner(pty),
								summary)));
				};
				var kamala_evs = count_evs('dem');
				var kamala_evs_share = A2($author$project$DisplayNumber$displayPctRnd, kamala_evs, total_evs);
				var kamala = A4(
					$author$project$Main$Bar,
					kamala_evs_share,
					dem_color,
					$elm$core$String$fromInt(kamala_evs),
					'left');
				var oth_evs = count_evs('oth');
				var oth_evs_share = A2($author$project$DisplayNumber$displayPctRnd, oth_evs, total_evs);
				var other = A4(
					$author$project$Main$Bar,
					oth_evs_share,
					oth_color,
					$elm$core$String$fromInt(oth_evs),
					'center');
				var trump_evs = count_evs('gop');
				var trump_evs_share = A2($author$project$DisplayNumber$displayPctRnd, trump_evs, total_evs);
				var trump = A4(
					$author$project$Main$Bar,
					trump_evs_share,
					gop_color,
					$elm$core$String$fromInt(trump_evs),
					'right');
				var und_evs = ((total_evs - kamala_evs) - oth_evs) - trump_evs;
				var und_evs_share = A2($author$project$DisplayNumber$displayPctRnd, und_evs, total_evs);
				var und = A4($author$project$Main$Bar, und_evs_share, und_color, '', '');
				var candidate_votes = function (cnd_id) {
					return $elm$core$List$sum(
						A2(
							$elm$core$List$map,
							function ($) {
								return $.votes;
							},
							A2(
								$elm$core$List$filter,
								A2(
									$elm$core$Basics$composeL,
									$elm$core$Basics$eq(cnd_id),
									function ($) {
										return $.cnd_id;
									}),
								A2(
									$elm$core$List$concatMap,
									function ($) {
										return $.results;
									},
									summary))));
				};
				var kamala_votes = candidate_votes('64984');
				var trump_votes = candidate_votes('8639');
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', '25%'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '25%')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$align('center')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$toUpper(
										$author$project$Office$toString(model.office_selected)))
								])),
							A2(party_line, 'Kamala Harris', 'Donald Trump'),
							A2(
							bars,
							_List_fromArray(
								[kamala, other, und, trump]),
							270),
							A2(
							party_line,
							$author$project$DisplayNumber$displayNumber(kamala_votes),
							$author$project$DisplayNumber$displayNumber(trump_votes)),
							A2(
							party_line,
							A2($author$project$DisplayNumber$displayPct, kamala_votes, total_votes),
							A2($author$project$DisplayNumber$displayPct, trump_votes, total_votes))
						]));
			default:
				var net = F2(
					function (pty, c) {
						var b = A2(
							$elm$core$Maybe$andThen,
							function ($) {
								return $.party;
							},
							$author$project$Contest$contestWinner(c));
						var a = A2(
							$elm$core$Maybe$map,
							function ($) {
								return $.holdingParty;
							},
							c.meta);
						var _v6 = _Utils_Tuple2(a, b);
						if (_v6.b.$ === 'Nothing') {
							var _v7 = _v6.b;
							return 0;
						} else {
							if (_v6.a.$ === 'Just') {
								var holdingParty = _v6.a.a;
								var winningParty = _v6.b.a;
								return _Utils_eq(holdingParty, winningParty) ? 0 : (_Utils_eq(winningParty, pty) ? 1 : (-1));
							} else {
								var _v8 = _v6.a;
								var winningParty = _v6.b.a;
								return _Utils_eq(winningParty, pty) ? 1 : 0;
							}
						}
					});
				var pty_chg = function (pty) {
					return A3(
						$elm$core$List$foldl,
						function (c) {
							return $elm$core$Basics$add(
								A2(net, pty, c));
						},
						0,
						summary);
				};
				var includeSpecial = function (meta) {
					return meta.isSpecial ? (_Utils_eq(meta.office, $author$project$Office$Senate) && (meta.fips === '31')) : true;
				};
				var proper_summary = A2(
					$elm$core$List$filter,
					A2(
						$elm$core$Basics$composeL,
						A2(
							$elm$core$Basics$composeL,
							$elm$core$Maybe$withDefault(false),
							$elm$core$Maybe$map(includeSpecial)),
						function ($) {
							return $.meta;
						}),
					summary);
				var total_seats = $elm$core$List$length(proper_summary);
				var winners = A2($elm$core$List$filterMap, $author$project$Contest$contestWinner, proper_summary);
				var party_count = function (pty) {
					return $elm$core$List$length(
						A2(
							$elm$core$List$filter,
							$elm$core$Basics$eq(pty),
							A2(
								$elm$core$List$map,
								function (v) {
									_v5$2:
									while (true) {
										if (v.$ === 'Just') {
											switch (v.a) {
												case 'dem':
													return 'dem';
												case 'gop':
													return 'gop';
												default:
													break _v5$2;
											}
										} else {
											break _v5$2;
										}
									}
									return 'oth';
								},
								A2(
									$elm$core$List$map,
									function ($) {
										return $.party;
									},
									winners))));
				};
				var oth_seats = party_count('oth');
				var gop_seats = party_count('gop');
				var gop_chg = pty_chg('gop');
				var gop_carryover_seats = function () {
					var _v4 = model.office_selected;
					switch (_v4.$) {
						case 'Senate':
							return 38;
						case 'Governor':
							return 19;
						default:
							return 0;
					}
				}();
				var displayPartyChange = function (chg) {
					var _v3 = A2($elm$core$Basics$compare, chg, 0);
					switch (_v3.$) {
						case 'EQ':
							return A2($elm$html$Html$div, _List_Nil, _List_Nil);
						case 'LT':
							return A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										$elm$core$String$fromInt(chg))
									]));
						default:
							return A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text(
										'+' + $elm$core$String$fromInt(chg))
									]));
					}
				};
				var dem_seats = party_count('dem');
				var und_seats = ((total_seats - dem_seats) - oth_seats) - gop_seats;
				var dem_chg = pty_chg('dem');
				var dem_carryover_seats = function () {
					var _v2 = model.office_selected;
					switch (_v2.$) {
						case 'Senate':
							return 28;
						case 'Governor':
							return 20;
						default:
							return 0;
					}
				}();
				var total_seats_with_carryover = (total_seats + dem_carryover_seats) + gop_carryover_seats;
				var dem_seat_shr = A2($author$project$DisplayNumber$displayPctRnd, dem_seats, total_seats_with_carryover);
				var gop_seat_shr = A2($author$project$DisplayNumber$displayPctRnd, gop_seats, total_seats_with_carryover);
				var gop = A4($author$project$Main$Bar, gop_seat_shr, gop_color, '', '');
				var maj = 1 + $elm$core$Basics$floor(total_seats_with_carryover / 2);
				var oth_seat_shr = A2($author$project$DisplayNumber$displayPctRnd, oth_seats, total_seats_with_carryover);
				var other = A4($author$project$Main$Bar, oth_seat_shr, oth_color, '', '');
				var und_seat_shr = A2($author$project$DisplayNumber$displayPctRnd, und_seats, total_seats_with_carryover);
				var und = A4($author$project$Main$Bar, und_seat_shr, und_color, '', '');
				var dem = A4($author$project$Main$Bar, dem_seat_shr, dem_color, '', '');
				var carryover_gop_seat_shr = A2($author$project$DisplayNumber$displayPctRnd, gop_carryover_seats, total_seats_with_carryover);
				var gop_carryover = A4($author$project$Main$Bar, carryover_gop_seat_shr, $author$project$ShadePalettes$gop_color_dark, '', '');
				var carryover_dem_seat_shr = A2($author$project$DisplayNumber$displayPctRnd, dem_carryover_seats, total_seats_with_carryover);
				var dem_carryover = A4($author$project$Main$Bar, carryover_dem_seat_shr, $author$project$ShadePalettes$dem_color_dark, '', '');
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'padding-left', '25%'),
							A2($elm$html$Html$Attributes$style, 'padding-right', '25%')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$align('center')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$toUpper(
										$author$project$Office$toString(model.office_selected)))
								])),
							A2(party_line, 'Dem', 'GOP'),
							A2(
							bars,
							_List_fromArray(
								[dem_carryover, dem, other, und, gop, gop_carryover]),
							maj),
							A2(
							party_line,
							_Utils_ap(
								$elm$core$String$fromInt(dem_seats),
								_Utils_eq(model.office_selected, $author$project$Office$Governor) ? '' : ' seats'),
							$elm$core$String$fromInt(gop_seats)),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'display', 'flex'),
									A2($elm$html$Html$Attributes$style, 'padding', '5px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'width', '50%')
										]),
									_List_fromArray(
										[
											displayPartyChange(dem_chg)
										])),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
											A2($elm$html$Html$Attributes$style, 'width', '50%')
										]),
									_List_fromArray(
										[
											displayPartyChange(gop_chg)
										]))
								]))
						]));
		}
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $author$project$ShadePalettes$displayColor = F3(
	function (r, g, b) {
		return 'rgb(' + ($elm$core$String$fromFloat(r) + (', ' + ($elm$core$String$fromFloat(g) + (', ' + ($elm$core$String$fromFloat(b) + ')')))));
	});
var $author$project$ShadePalettes$tintFunc = F3(
	function (share, h0, h1) {
		return ((1.0 - share) * (h1 - h0)) + h0;
	});
var $author$project$ShadePalettes$getMetaShade = function (share) {
	var tint = $author$project$ShadePalettes$tintFunc(share);
	return A3(
		$author$project$ShadePalettes$displayColor,
		0,
		0,
		A2(tint, 0, 255));
};
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $author$project$Contest$isReferendum = function (c) {
	return A2(
		$elm$core$Maybe$withDefault,
		false,
		A2(
			$elm$core$Maybe$map,
			function ($) {
				return $.isReferendum;
			},
			c.meta));
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onMouseEnter = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseenter',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$Events$onMouseLeave = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseleave',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Contest$pairToCandidate = F2(
	function (results, _v0) {
		var cnd_id = _v0.a;
		var votes = _v0.b;
		return A2(
			$elm$core$Maybe$map,
			function (cnd) {
				return {cnd_id: cnd_id, isIncumbent: cnd.isIncumbent, name: cnd.name, party: cnd.party, short_name: cnd.short_name, votes: votes, winner: cnd.winner};
			},
			A2(
				$elm_community$list_extra$List$Extra$find,
				function (cnd) {
					return _Utils_eq(cnd.cnd_id, cnd_id);
				},
				results));
	});
var $author$project$Main$colorPalette = F3(
	function (winner, results, palette_func) {
		var winner_votes = winner.votes;
		var total = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.votes;
				},
				results));
		var winner_share = winner_votes / total;
		var tie = 1 > $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				$elm$core$Basics$eq(winner_votes),
				A2(
					$elm$core$List$map,
					function ($) {
						return $.votes;
					},
					results)));
		var premium = 0.4;
		var share_a = (winner_share - premium) / (1.0 - premium);
		return (!total) ? 'white' : (tie ? 'gold' : palette_func(share_a));
	});
var $author$project$ShadePalettes$getPartyShade = F2(
	function (pty, share) {
		var tint = $author$project$ShadePalettes$tintFunc(share);
		switch (pty) {
			case 'dem':
				return A3(
					$author$project$ShadePalettes$displayColor,
					A2(tint, 0, 204),
					A2(tint, 32, 230),
					A2(tint, 64, 255));
			case 'gop':
				return A3(
					$author$project$ShadePalettes$displayColor,
					A2(tint, 64, 255),
					A2(tint, 0, 204),
					A2(tint, 0, 204));
			default:
				return A3(
					$author$project$ShadePalettes$displayColor,
					A2(tint, 0, 255),
					A2(tint, 0, 255),
					A2(tint, 0, 255));
		}
	});
var $author$project$Main$partyColorPalette = function (results) {
	var _v0 = $elm$core$List$reverse(
		A2(
			$elm$core$List$sortBy,
			function ($) {
				return $.votes;
			},
			results));
	if (!_v0.b) {
		return 'white';
	} else {
		if (!_v0.b.b) {
			var winner = _v0.a;
			return A2(
				$author$project$ShadePalettes$getPartyShade,
				A2($elm$core$Maybe$withDefault, 'oth', winner.party),
				1);
		} else {
			var winner = _v0.a;
			return A3(
				$author$project$Main$colorPalette,
				winner,
				results,
				$author$project$ShadePalettes$getPartyShade(
					A2($elm$core$Maybe$withDefault, 'oth', winner.party)));
		}
	}
};
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $author$project$ShadePalettes$getResponseShade = F2(
	function (pty, share) {
		var tint = $author$project$ShadePalettes$tintFunc(share);
		switch (pty) {
			case 'Yes':
				return A3(
					$author$project$ShadePalettes$displayColor,
					A2(tint, 0, 0),
					A2(tint, 0, 255),
					A2(tint, 0, 0));
			case 'No':
				return A3(
					$author$project$ShadePalettes$displayColor,
					A2(tint, 0, 255),
					A2(tint, 0, 0),
					A2(tint, 0, 0));
			default:
				return A3(
					$author$project$ShadePalettes$displayColor,
					A2(tint, 0, 255),
					A2(tint, 0, 255),
					A2(tint, 0, 255));
		}
	});
var $author$project$Main$questionColorPalette = function (results) {
	var _v0 = $elm$core$List$reverse(
		A2(
			$elm$core$List$sortBy,
			function ($) {
				return $.votes;
			},
			results));
	if ((_v0.b && _v0.b.b) && (!_v0.b.b.b)) {
		var winner = _v0.a;
		var _v1 = _v0.b;
		return A3(
			$author$project$Main$colorPalette,
			winner,
			results,
			$author$project$ShadePalettes$getResponseShade(winner.name));
	} else {
		return 'white';
	}
};
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $author$project$Contest$contestSwing = F3(
	function (before, now, pty) {
		var votes_now = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.votes;
				},
				A2(
					$elm$core$List$filter,
					function (cnd) {
						return _Utils_eq(
							cnd.party,
							$elm$core$Maybe$Just(pty));
					},
					now)));
		var votes_before = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.votes;
				},
				A2(
					$elm$core$List$filter,
					function (cnd) {
						return _Utils_eq(
							cnd.party,
							$elm$core$Maybe$Just(pty));
					},
					before)));
		var total_now = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.votes;
				},
				now));
		var total_before = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.votes;
				},
				before));
		var share_now = votes_now / total_now;
		var share_before = votes_before / total_before;
		return share_now - share_before;
	});
var $author$project$Contest$tpSwing = F2(
	function (before, now) {
		return A3($author$project$Contest$contestSwing, before, now, 'dem') - A3($author$project$Contest$contestSwing, before, now, 'gop');
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $author$project$Main$tpSwingColorPalette = function (tp_swing) {
	var _v0 = A2($elm$core$Basics$compare, tp_swing, 0);
	switch (_v0.$) {
		case 'GT':
			return A2($author$project$ShadePalettes$getPartyShade, 'dem', tp_swing);
		case 'LT':
			return A2(
				$author$project$ShadePalettes$getPartyShade,
				'gop',
				$elm$core$Basics$abs(tp_swing));
		default:
			return 'gold';
	}
};
var $author$project$Main$countyPath = F3(
	function (map_showing, c, county) {
		var _v0 = county.geo;
		if (_v0.$ === 'Just') {
			var geo = _v0.a;
			var swing_from = A2(
				$elm$core$List$filterMap,
				$author$project$Contest$pairToCandidate(c.results),
				$elm$core$Dict$toList(county.swing_from));
			var results = A2(
				$elm$core$List$filterMap,
				$author$project$Contest$pairToCandidate(c.results),
				$elm$core$Dict$toList(county.results));
			var color = function () {
				switch (map_showing.$) {
					case 'WinnerShare':
						return $author$project$Contest$isReferendum(c) ? $author$project$Main$questionColorPalette(results) : $author$project$Main$partyColorPalette(results);
					case 'Swing':
						return $author$project$Contest$isReferendum(c) ? 'lightgray' : $author$project$Main$tpSwingColorPalette(
							A2($author$project$Contest$tpSwing, swing_from, results));
					default:
						return $author$project$ShadePalettes$getMetaShade(county.progress);
				}
			}();
			return A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d(geo),
						$elm$svg$Svg$Attributes$fill(color),
						$elm$svg$Svg$Attributes$stroke('white'),
						$elm$svg$Svg$Attributes$strokeWidth('0.5px'),
						$elm$svg$Svg$Attributes$id(county.county_fips),
						$elm$html$Html$Events$onMouseEnter(
						$author$project$Main$SelectCounty(
							$elm$core$Maybe$Just(
								_Utils_Tuple2(
									county,
									_Utils_Tuple2(0, 0))))),
						$elm$html$Html$Events$onMouseLeave(
						$author$project$Main$SelectCounty($elm$core$Maybe$Nothing))
					]),
				_List_Nil);
		} else {
			return A2(
				$elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($elm$core$Maybe$withDefault, 'Not found in geojson file', county.name))
					]));
		}
	});
var $author$project$Main$countyMap = F2(
	function (map_showing, c) {
		var _v0 = c.counties;
		if (_v0.$ === 'Just') {
			var counties = _v0.a;
			return A2(
				$elm$svg$Svg$g,
				_List_Nil,
				A2(
					$elm$core$List$map,
					A2($author$project$Main$countyPath, map_showing, c),
					counties));
		} else {
			return A2($elm$svg$Svg$g, _List_Nil, _List_Nil);
		}
	});
var $author$project$Contest$countyToContest = F2(
	function (c, county) {
		var makeCandidate = function (_v0) {
			var cnd_id = _v0.a;
			var votes = _v0.b;
			return A2(
				$elm$core$Maybe$map,
				function (cnd) {
					return _Utils_update(
						cnd,
						{votes: votes});
				},
				A2(
					$elm_community$list_extra$List$Extra$find,
					A2(
						$elm$core$Basics$composeL,
						$elm$core$Basics$eq(cnd_id),
						function ($) {
							return $.cnd_id;
						}),
					c.results));
		};
		return _Utils_update(
			c,
			{
				id: A2($elm$core$Maybe$withDefault, county.county_fips, county.name),
				progress: county.progress,
				results: A2(
					$elm$core$List$filterMap,
					makeCandidate,
					$elm$core$Dict$toList(county.results))
			});
	});
var $elm$html$Html$Attributes$colspan = function (n) {
	return A2(
		_VirtualDom_attribute,
		'colspan',
		$elm$core$String$fromInt(n));
};
var $author$project$ShadePalettes$responseColor = function (cnd) {
	switch (cnd) {
		case 'Yes':
			return '#008800';
		case 'No':
			return '#ff0000';
		default:
			return '#cccccc';
	}
};
var $author$project$Contest$smallRowStyle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'padding', '4px'),
		A2($elm$html$Html$Attributes$style, 'border-bottom', '1px solid black'),
		A2($elm$html$Html$Attributes$style, 'border-top', '1px solid black'),
		A2($elm$html$Html$Attributes$style, 'max-width', 'fit-content')
	]);
var $elm$html$Html$td = _VirtualDom_node('td');
var $author$project$Contest$smallCandidate = F2(
	function (total_votes, cnd) {
		var color = A2(
			$elm$core$List$member,
			cnd.name,
			_List_fromArray(
				['Yes', 'No'])) ? $author$project$ShadePalettes$responseColor(cnd.name) : $author$project$ShadePalettes$partyColor(
			A2($elm$core$Maybe$withDefault, 'oth', cnd.party));
		return _List_fromArray(
			[
				A2(
				$elm$html$Html$td,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'background-color', color),
						A2($elm$html$Html$Attributes$style, 'width', '5px')
					]),
				_List_Nil),
				A2(
				$elm$html$Html$td,
				$author$project$Contest$smallRowStyle,
				_List_fromArray(
					[
						$elm$html$Html$text(cnd.short_name)
					])),
				A2(
				$elm$html$Html$td,
				A2(
					$elm$core$List$cons,
					A2($elm$html$Html$Attributes$style, 'text-align', 'right'),
					$author$project$Contest$smallRowStyle),
				_List_fromArray(
					[
						$elm$html$Html$text(
						$author$project$DisplayNumber$displayNumber(cnd.votes))
					])),
				A2(
				$elm$html$Html$td,
				$author$project$Contest$smallRowStyle,
				_List_fromArray(
					[
						$elm$html$Html$text(
						A2($author$project$DisplayNumber$displayPct, cnd.votes, total_votes))
					]))
			]);
	});
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Contest$smallRows = F2(
	function (total_votes, sorted_results) {
		if (!sorted_results.b) {
			return _List_fromArray(
				[
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('No candidates.')
								]))
						]))
				]);
		} else {
			if (!sorted_results.b.b) {
				var uncontested = sorted_results.a;
				return _List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						A2($author$project$Contest$smallCandidate, total_votes, uncontested))
					]);
			} else {
				if (!sorted_results.b.b.b) {
					var first = sorted_results.a;
					var _v1 = sorted_results.b;
					var second = _v1.a;
					return _List_fromArray(
						[
							A2(
							$elm$html$Html$tr,
							_List_Nil,
							A2($author$project$Contest$smallCandidate, total_votes, first)),
							A2(
							$elm$html$Html$tr,
							_List_Nil,
							A2($author$project$Contest$smallCandidate, total_votes, second))
						]);
				} else {
					if (!sorted_results.b.b.b.b) {
						var first = sorted_results.a;
						var _v2 = sorted_results.b;
						var second = _v2.a;
						var _v3 = _v2.b;
						var third = _v3.a;
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2($author$project$Contest$smallCandidate, total_votes, first)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2($author$project$Contest$smallCandidate, total_votes, second)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2($author$project$Contest$smallCandidate, total_votes, third))
							]);
					} else {
						var first = sorted_results.a;
						var _v4 = sorted_results.b;
						var second = _v4.a;
						var others = _v4.b;
						var third = {
							cnd_id: 'others',
							isIncumbent: false,
							name: 'Others',
							party: $elm$core$Maybe$Just('oth'),
							short_name: 'Others',
							votes: $elm$core$List$sum(
								A2(
									$elm$core$List$map,
									function ($) {
										return $.votes;
									},
									others)),
							winner: false
						};
						return _List_fromArray(
							[
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2($author$project$Contest$smallCandidate, total_votes, first)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2($author$project$Contest$smallCandidate, total_votes, second)),
								A2(
								$elm$html$Html$tr,
								_List_Nil,
								A2($author$project$Contest$smallCandidate, total_votes, third))
							]);
					}
				}
			}
		}
	});
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$th = _VirtualDom_node('th');
var $author$project$Contest$smallContestResults = F2(
	function (getname, c) {
		var total_votes = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.votes;
				},
				c.results));
		var sorted_results = $elm$core$List$reverse(
			A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.votes;
				},
				c.results));
		return A2(
			$elm$html$Html$table,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'border-collapse', 'collapse'),
					A2($elm$html$Html$Attributes$style, 'max-width', 'fit-content'),
					A2($elm$html$Html$Attributes$style, 'display', 'inline')
				]),
			A2(
				$elm$core$List$cons,
				A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$th,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$colspan(10)
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									getname(c))
								]))
						])),
				_Utils_ap(
					A2($author$project$Contest$smallRows, total_votes, sorted_results),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$tr,
							_List_Nil,
							_List_fromArray(
								[
									A2($elm$html$Html$th, _List_Nil, _List_Nil),
									A2(
									$elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Total Votes')
										])),
									A2(
									$elm$html$Html$th,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$colspan(2)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$author$project$DisplayNumber$displayNumber(total_votes))
										]))
								])),
							A2(
							$elm$html$Html$tr,
							_List_Nil,
							_List_fromArray(
								[
									A2($elm$html$Html$th, _List_Nil, _List_Nil),
									A2(
									$elm$html$Html$th,
									_List_Nil,
									_List_fromArray(
										[
											$elm$html$Html$text('Progress')
										])),
									A2(
									$elm$html$Html$th,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$colspan(2)
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(
												$elm$core$Basics$round(c.progress * 100)) + '%')
										]))
								]))
						]))));
	});
var $author$project$Main$countyTable = F2(
	function (contest, m_county) {
		if (m_county.$ === 'Just') {
			var _v1 = m_county.a;
			var county = _v1.a;
			var _v2 = _v1.b;
			var x = _v2.a;
			var y = _v2.b;
			var new_contest = A2($author$project$Contest$countyToContest, contest, county);
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'position', 'absolute'),
						A2(
						$elm$html$Html$Attributes$style,
						'left',
						$elm$core$String$fromInt(x) + 'px'),
						A2(
						$elm$html$Html$Attributes$style,
						'top',
						$elm$core$String$fromInt(y) + 'px'),
						A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
						A2($elm$html$Html$Attributes$style, 'padding', '5px'),
						A2($elm$html$Html$Attributes$style, 'box-shadow', '0 2px 5px rgba(0,0,0,.1)'),
						A2($elm$html$Html$Attributes$style, 'border-radius', '5px')
					]),
				_List_fromArray(
					[
						A2(
						$author$project$Contest$smallContestResults,
						function ($) {
							return $.id;
						},
						new_contest)
					]));
		} else {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'opacity', '0')
					]),
				_List_Nil);
		}
	});
var $elm$core$String$cons = _String_cons;
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)),
			string);
	});
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Contest$displayTimestamp = function (posix) {
	var minute = A3(
		$elm$core$String$padLeft,
		2,
		_Utils_chr('0'),
		$elm$core$String$fromInt(
			A2($elm$time$Time$toMinute, $elm$time$Time$utc, posix)));
	var hour24 = A2($elm$time$Time$toHour, $elm$time$Time$utc, posix);
	var hour = $elm$core$String$fromInt(
		(hour24 > 12) ? (hour24 - 12) : ((!hour24) ? 12 : hour24));
	return hour + (':' + minute);
};
var $author$project$Contest$fipsToName = function (fips) {
	switch (fips) {
		case '01':
			return 'Alabama';
		case '02':
			return 'Alaska';
		case '04':
			return 'Arizona';
		case '05':
			return 'Arkansas';
		case '06':
			return 'California';
		case '08':
			return 'Colorado';
		case '09':
			return 'Connecticut';
		case '10':
			return 'Delaware';
		case '11':
			return 'District of Columbia';
		case '12':
			return 'Florida';
		case '13':
			return 'Georgia';
		case '15':
			return 'Hawaii';
		case '16':
			return 'Idaho';
		case '17':
			return 'Illinois';
		case '18':
			return 'Indiana';
		case '19':
			return 'Iowa';
		case '20':
			return 'Kansas';
		case '21':
			return 'Kentucky';
		case '22':
			return 'Louisiana';
		case '23':
			return 'Maine';
		case '24':
			return 'Maryland';
		case '25':
			return 'Massachusetts';
		case '26':
			return 'Michigan';
		case '27':
			return 'Minnesota';
		case '28':
			return 'Mississippi';
		case '29':
			return 'Missouri';
		case '30':
			return 'Montana';
		case '31':
			return 'Nebraska';
		case '32':
			return 'Nevada';
		case '33':
			return 'New Hampshire';
		case '34':
			return 'New Jersey';
		case '35':
			return 'New Mexico';
		case '36':
			return 'New York';
		case '37':
			return 'North Carolina';
		case '38':
			return 'North Dakota';
		case '39':
			return 'Ohio';
		case '40':
			return 'Oklahoma';
		case '41':
			return 'Oregon';
		case '42':
			return 'Pennsylvania';
		case '44':
			return 'Rhode Island';
		case '45':
			return 'South Carolina';
		case '46':
			return 'South Dakota';
		case '47':
			return 'Tennessee';
		case '48':
			return 'Texas';
		case '49':
			return 'Utah';
		case '50':
			return 'Vermont';
		case '51':
			return 'Virginia';
		case '53':
			return 'Washington';
		case '54':
			return 'West Virginia';
		case '55':
			return 'Wisconsin';
		case '56':
			return 'Wyoming';
		default:
			return A2($elm$core$String$contains, ' County', fips) ? fips : fips;
	}
};
var $author$project$Contest$getSmallName = function (c) {
	var _v0 = c.meta;
	if (_v0.$ === 'Just') {
		var meta = _v0.a;
		var defaultDistrict = $elm$core$Maybe$withDefault('0');
		return A2(
			$elm$core$List$member,
			meta.office,
			_List_fromArray(
				[$author$project$Office$StateSenate, $author$project$Office$StateHouse])) ? ('District ' + defaultDistrict(meta.district)) : (_Utils_eq(meta.office, $author$project$Office$House) ? ($author$project$Contest$fipsToName(meta.fips) + (' - ' + defaultDistrict(meta.district))) : _Utils_ap(
			$author$project$Contest$fipsToName(meta.fips),
			meta.isSpecial ? ' (Spc.)' : ''));
	} else {
		return c.id;
	}
};
var $elm$core$String$toLower = _String_toLower;
var $author$project$Contest$displayCall = function (_v0) {
	var c = _v0.a;
	var call = _v0.b;
	var _v1 = c.meta;
	if (_v1.$ === 'Just') {
		var meta = _v1.a;
		var winner = meta.isReferendum ? A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function ($) {
					return $.name;
				},
				$author$project$Contest$contestWinner(c))) : $elm$core$String$toUpper(
			A2(
				$elm$core$Maybe$withDefault,
				meta.holdingParty,
				A2(
					$elm$core$Maybe$andThen,
					function ($) {
						return $.party;
					},
					$author$project$Contest$contestWinner(c))));
		var shortened_name = A3(
			$elm$core$String$replace,
			'Connecticut',
			'Connect.',
			A3(
				$elm$core$String$replace,
				'District of Columbia',
				'D.C.',
				A3(
					$elm$core$String$replace,
					'Massachusetts',
					'Mass.',
					A3(
						$elm$core$String$replace,
						'New',
						'N.',
						A3(
							$elm$core$String$replace,
							'Island',
							'Isl.',
							A3(
								$elm$core$String$replace,
								'West',
								'W.',
								A3(
									$elm$core$String$replace,
									'North',
									'N.',
									A3(
										$elm$core$String$replace,
										'South',
										'S.',
										$author$project$Contest$getSmallName(c)))))))));
		var color = meta.isReferendum ? $author$project$ShadePalettes$responseColor(winner) : $author$project$ShadePalettes$partyColor(
			$elm$core$String$toLower(winner));
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'display', 'flex'),
					A2($elm$html$Html$Attributes$style, 'width', '95%'),
					A2($elm$html$Html$Attributes$style, 'padding', '2px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'color', 'gray'),
							A2($elm$html$Html$Attributes$style, 'padding', '5px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(
							$author$project$Contest$displayTimestamp(call.timestamp))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'background-color', color),
							A2($elm$html$Html$Attributes$style, 'padding', '5px'),
							A2($elm$html$Html$Attributes$style, 'border-radius', '2px'),
							A2($elm$html$Html$Attributes$style, 'color', 'white'),
							A2($elm$html$Html$Attributes$style, 'width', 'inherit')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(shortened_name),
							$elm$html$Html$text(': '),
							$elm$html$Html$text(winner),
							meta.isReferendum ? $elm$html$Html$text('') : ((!_Utils_eq(
							$elm$core$String$toLower(winner),
							meta.holdingParty)) ? A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									A2($elm$html$Html$Attributes$style, 'font-weight', 'bold')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(' gain')
								])) : $elm$html$Html$text(' hold'))
						]))
				]));
	} else {
		return $elm$html$Html$text('No meta');
	}
};
var $author$project$Contest$displayCalls = function (calls) {
	return A2($elm$core$List$map, $author$project$Contest$displayCall, calls);
};
var $author$project$Main$Progress = {$: 'Progress'};
var $author$project$Main$Swing = {$: 'Swing'};
var $author$project$Main$notSelectedStyle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'outline', '1px solid lightgray'),
		A2($elm$html$Html$Attributes$style, 'background-color', 'white'),
		A2($elm$html$Html$Attributes$style, 'color', 'black')
	]);
var $author$project$Main$selectedStyle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'outline', '1px solid black'),
		A2($elm$html$Html$Attributes$style, 'background-color', 'gray'),
		A2($elm$html$Html$Attributes$style, 'color', 'white')
	]);
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Main$toggleButtonStyle = F2(
	function (toggleMsg, option) {
		return _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'display', 'inline'),
				A2($elm$html$Html$Attributes$style, 'padding', 'inherit'),
				A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
				$elm$html$Html$Events$onClick(
				toggleMsg(option))
			]);
	});
var $author$project$Main$displayMapToggleButtons = F3(
	function (unit_name, toggleMsg, current) {
		var extra_style = function (option) {
			return _Utils_eq(current, option) ? $author$project$Main$selectedStyle : $author$project$Main$notSelectedStyle;
		};
		var button_style = function (option) {
			var _v0 = function () {
				switch (option.$) {
					case 'WinnerShare':
						return _Utils_Tuple2('border-top-left-radius', 'border-bottom-left-radius');
					case 'Swing':
						return _Utils_Tuple2('', '');
					default:
						return _Utils_Tuple2('border-top-right-radius', 'border-bottom-right-radius');
				}
			}();
			var radius_attribute_top = _v0.a;
			var radius_attribute_bottom = _v0.b;
			return _Utils_ap(
				A2($author$project$Main$toggleButtonStyle, toggleMsg, option),
				_Utils_ap(
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, radius_attribute_top, '8px'),
							A2($elm$html$Html$Attributes$style, radius_attribute_bottom, '8px')
						]),
					extra_style(option)));
		};
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2($elm$html$Html$Attributes$style, 'padding-top', '5px')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('Shade ' + (unit_name + ' by:'))
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'display', 'flex'),
							A2($elm$html$Html$Attributes$style, 'align-items', 'center'),
							A2($elm$html$Html$Attributes$style, 'justify-content', 'center'),
							A2($elm$html$Html$Attributes$style, 'padding', '10px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							button_style($author$project$Main$WinnerShare),
							_List_fromArray(
								[
									$elm$html$Html$text('Leader\'s %')
								])),
							(!A2(
							$elm$core$List$member,
							unit_name,
							_List_fromArray(
								['districts', 'states']))) ? A2(
							$elm$html$Html$div,
							button_style($author$project$Main$Swing),
							_List_fromArray(
								[
									$elm$html$Html$text('Swing')
								])) : A2($elm$html$Html$span, _List_Nil, _List_Nil),
							A2(
							$elm$html$Html$div,
							button_style($author$project$Main$Progress),
							_List_fromArray(
								[
									$elm$html$Html$text('% Reporting')
								]))
						]))
				]));
	});
var $author$project$Main$errorToString = function (error) {
	switch (error.$) {
		case 'BadUrl':
			var url = error.a;
			return 'The URL ' + (url + ' was invalid');
		case 'Timeout':
			return 'Unable to reach the server, try again';
		case 'NetworkError':
			return 'Unable to reach the server, check your network connection';
		case 'BadStatus':
			switch (error.a) {
				case 500:
					return 'The server had a problem, try again later';
				case 400:
					return 'Verify your information and try again';
				default:
					return 'Unknown error';
			}
		default:
			var errorMessage = error.a;
			return errorMessage;
	}
};
var $author$project$Contest$getCallsContest = function (c) {
	return A2(
		$elm$core$List$map,
		function (call) {
			return _Utils_Tuple2(c, call);
		},
		c.calls);
};
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Contest$getCalls = function (summary) {
	return $elm$core$List$reverse(
		A2(
			$elm$core$List$sortBy,
			A2(
				$elm$core$Basics$composeL,
				A2(
					$elm$core$Basics$composeL,
					$elm$time$Time$posixToMillis,
					function ($) {
						return $.timestamp;
					}),
				$elm$core$Tuple$second),
			A2($elm$core$List$concatMap, $author$project$Contest$getCallsContest, summary)));
};
var $author$project$Main$SelectState = function (a) {
	return {$: 'SelectState', a: a};
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $author$project$Main$groupListItem = F2(
	function (selected, fips) {
		var selected_style = function () {
			if (selected.$ === 'Just') {
				var a = selected.a;
				return _Utils_eq(a, fips) ? _Utils_ap(
					$author$project$Main$selectedStyle,
					_List_fromArray(
						[
							$elm$html$Html$Events$onClick(
							$author$project$Main$SelectState($elm$core$Maybe$Nothing)),
							A2($elm$html$Html$Attributes$style, 'border-radius', '6px')
						])) : _List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Main$SelectState(
							$elm$core$Maybe$Just(fips)))
					]);
			} else {
				return _List_fromArray(
					[
						$elm$html$Html$Events$onClick(
						$author$project$Main$SelectState(
							$elm$core$Maybe$Just(fips)))
					]);
			}
		}();
		return A2(
			$elm$html$Html$li,
			_Utils_ap(
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
						A2($elm$html$Html$Attributes$style, 'list-style', 'none'),
						A2($elm$html$Html$Attributes$style, 'padding', '3px')
					]),
				selected_style),
			_List_fromArray(
				[
					$elm$html$Html$text(
					$author$project$Contest$fipsToName(fips))
				]));
	});
var $elm$core$List$sort = function (xs) {
	return A2($elm$core$List$sortBy, $elm$core$Basics$identity, xs);
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return $elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2($elm$core$List$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2($elm$core$List$cons, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2($elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$unique = function (list) {
	return A4($elm_community$list_extra$List$Extra$uniqueHelp, $elm$core$Basics$identity, _List_Nil, list, _List_Nil);
};
var $author$project$Main$groupList = function (model) {
	var groups = A2(
		$elm$core$List$member,
		model.office_selected,
		_List_fromArray(
			[$author$project$Office$StateSenate, $author$project$Office$StateHouse])) ? A2(
		$elm$core$Maybe$withDefault,
		_List_Nil,
		A2($elm$core$Maybe$map, $elm$core$Dict$keys, model.zoom_coords)) : $elm_community$list_extra$List$Extra$unique(
		$elm$core$List$sort(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.fips;
				},
				A2(
					$elm$core$List$filterMap,
					function ($) {
						return $.meta;
					},
					model.data))));
	return A2(
		$elm$html$Html$ul,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'height', '400px'),
				A2($elm$html$Html$Attributes$style, 'width', 'max-content'),
				A2($elm$html$Html$Attributes$style, 'overflow', 'scroll')
			]),
		A2(
			$elm$core$List$map,
			$author$project$Main$groupListItem(model.filter_state),
			groups));
};
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Main$mapAUnit = function (state_fips) {
	return A2(
		$elm$core$List$member,
		state_fips,
		_List_fromArray(
			['09', '23', '25', '33', '44', '50'])) ? 'municipalities' : ((state_fips === '02') ? 'state' : ((state_fips === '11') ? 'District' : ((state_fips === '22') ? 'parishes' : 'counties')));
};
var $author$project$Main$mapBUnit = function (model) {
	return A2(
		$elm$core$List$member,
		model.office_selected,
		_List_fromArray(
			[$author$project$Office$House, $author$project$Office$StateSenate, $author$project$Office$StateHouse])) ? 'districts' : 'states';
};
var $author$project$Main$SelectOffice = function (a) {
	return {$: 'SelectOffice', a: a};
};
var $author$project$Main$navStyle = _List_fromArray(
	[
		A2($elm$html$Html$Attributes$style, 'padding', '10px'),
		A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
		A2($elm$html$Html$Attributes$style, 'cursor', 'pointer'),
		A2($elm$html$Html$Attributes$style, 'border', '1px solid black'),
		A2($elm$html$Html$Attributes$style, 'border-radius', '8px'),
		A2($elm$html$Html$Attributes$style, 'width', '10px')
	]);
var $author$project$Main$nav = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A2(
				$elm$html$Html$table,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'left', '2%'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$colspan(2),
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$President))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('President')
									])),
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$colspan(2),
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$Governor))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('Governors')
									]))
							])),
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$Senate))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('Senate')
									])),
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$House))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('House')
									])),
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$StateSenate))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('State Senate')
									])),
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$StateHouse))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('State House')
									]))
							]))
					])),
				A2(
				$elm$html$Html$table,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'right', '2%'),
						A2($elm$html$Html$Attributes$style, 'position', 'absolute')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$GeorgiaQuestions))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('Georgia Referenda')
									])),
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$AbortionQuestions))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('Abortion Referenda')
									]))
							])),
						A2(
						$elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$RCVQuestions))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('RCV Referenda')
									])),
								A2(
								$elm$html$Html$td,
								_Utils_ap(
									$author$project$Main$navStyle,
									_List_fromArray(
										[
											$elm$html$Html$Events$onClick(
											$author$project$Main$SelectOffice($author$project$Office$OtherQuestions))
										])),
								_List_fromArray(
									[
										$elm$html$Html$text('Other Referenda')
									]))
							]))
					]))
			]));
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $author$project$Main$nextInLinup = F2(
	function (model, summary) {
		var makeResults = function (c) {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						A2($elm$html$Html$Attributes$style, 'padding-left', '10px')
					]),
				$elm$core$List$singleton(
					A2($author$project$Contest$smallContestResults, $author$project$Contest$getSmallName, c)));
		};
		if (model.window_width < 1500) {
			if (((summary.b && summary.b.b) && summary.b.b.b) && summary.b.b.b.b) {
				var x1 = summary.a;
				var _v1 = summary.b;
				var x2 = _v1.a;
				var _v2 = _v1.b;
				var x3 = _v2.a;
				var _v3 = _v2.b;
				var x4 = _v3.a;
				return A2(
					$elm$core$List$map,
					makeResults,
					_List_fromArray(
						[x1, x2, x3, x4]));
			} else {
				return _List_Nil;
			}
		} else {
			if (((((summary.b && summary.b.b) && summary.b.b.b) && summary.b.b.b.b) && summary.b.b.b.b.b) && summary.b.b.b.b.b.b) {
				var x1 = summary.a;
				var _v5 = summary.b;
				var x2 = _v5.a;
				var _v6 = _v5.b;
				var x3 = _v6.a;
				var _v7 = _v6.b;
				var x4 = _v7.a;
				var _v8 = _v7.b;
				var x5 = _v8.a;
				var _v9 = _v8.b;
				var x6 = _v9.a;
				return A2(
					$elm$core$List$map,
					makeResults,
					_List_fromArray(
						[x1, x2, x3, x4, x5, x6]));
			} else {
				return _List_Nil;
			}
		}
	});
var $author$project$ViewBox$defaultBViewBox = A4($author$project$ViewBox$ViewBox, 0, 0, 950, 700);
var $author$project$Main$pickViewBox = F2(
	function (model, fips) {
		var _v0 = _Utils_Tuple2(model.filter_state, model.zoom_coords);
		if ((_v0.a.$ === 'Just') && (_v0.b.$ === 'Just')) {
			var zoom_coords = _v0.b.a;
			var _v1 = A2($elm$core$Dict$get, fips, zoom_coords);
			if (_v1.$ === 'Just') {
				var a = _v1.a;
				return a;
			} else {
				return $author$project$ViewBox$defaultBViewBox;
			}
		} else {
			return $author$project$ViewBox$defaultBViewBox;
		}
	});
var $elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var $elm$html$Html$map = $elm$virtual_dom$VirtualDom$map;
var $author$project$BallotQuestionMeta$passageExplanationCompeting = function (bq_meta) {
	return bq_meta.competing ? $elm$core$Maybe$Just('needs more \'Yes\' votes than the competing measure') : $elm$core$Maybe$Nothing;
};
var $author$project$BallotQuestionMeta$displayPct = function (flt) {
	return A2(
		$elm$core$String$left,
		2,
		$elm$core$String$fromFloat(flt * 100));
};
var $author$project$BallotQuestionMeta$passageExplanationThreshold = function (bq_meta) {
	return (bq_meta.threshold === 0.5) ? 'needs a simple majority' : ('must pass with at least ' + ($author$project$BallotQuestionMeta$displayPct(bq_meta.threshold) + '% of the vote'));
};
var $author$project$BallotQuestionMeta$passageExplanationTotVoterThreshold = function (bq_meta) {
	return A2(
		$elm$core$Maybe$map,
		function (total_voter_threshold) {
			var pct = $author$project$BallotQuestionMeta$displayPct(total_voter_threshold);
			return 'must be approved by at least ' + (pct + '% of total ballots cast (including blank votes)');
		},
		bq_meta.total_voter_threshold);
};
var $author$project$BallotQuestionMeta$passageExplanation = function (bq_meta) {
	var _v0 = _Utils_Tuple3(
		$author$project$BallotQuestionMeta$passageExplanationThreshold(bq_meta),
		$author$project$BallotQuestionMeta$passageExplanationTotVoterThreshold(bq_meta),
		$author$project$BallotQuestionMeta$passageExplanationCompeting(bq_meta));
	if (_v0.b.$ === 'Nothing') {
		if (_v0.c.$ === 'Nothing') {
			var thres_expl = _v0.a;
			var _v1 = _v0.b;
			var _v2 = _v0.c;
			return $elm$html$Html$text('This measure ' + (thres_expl + ' to be enacted'));
		} else {
			var thres_expl = _v0.a;
			var _v4 = _v0.b;
			var passage_expl = _v0.c.a;
			return A2(
				$elm$html$Html$span,
				_List_Nil,
				A2(
					$elm$core$List$intersperse,
					A2($elm$html$Html$br, _List_Nil, _List_Nil),
					_List_fromArray(
						[
							$elm$html$Html$text('This measure:'),
							$elm$html$Html$text('• ' + (thres_expl + ', and')),
							$elm$html$Html$text('• ' + passage_expl),
							$elm$html$Html$text('In order to be enacted')
						])));
		}
	} else {
		if (_v0.c.$ === 'Nothing') {
			var thres_expl = _v0.a;
			var tot_thres_expl = _v0.b.a;
			var _v3 = _v0.c;
			return A2(
				$elm$html$Html$span,
				_List_Nil,
				A2(
					$elm$core$List$intersperse,
					A2($elm$html$Html$br, _List_Nil, _List_Nil),
					_List_fromArray(
						[
							$elm$html$Html$text('This measure:'),
							$elm$html$Html$text('• ' + (thres_expl + ', and')),
							$elm$html$Html$text('• ' + tot_thres_expl),
							$elm$html$Html$text('In order to be enacted')
						])));
		} else {
			var thres_expl = _v0.a;
			var tot_thres_expl = _v0.b.a;
			var passage_expl = _v0.c.a;
			return A2(
				$elm$html$Html$span,
				_List_Nil,
				A2(
					$elm$core$List$intersperse,
					A2($elm$html$Html$br, _List_Nil, _List_Nil),
					_List_fromArray(
						[
							$elm$html$Html$text('This measure:'),
							$elm$html$Html$text('• ' + (thres_expl + ',')),
							$elm$html$Html$text('• ' + (tot_thres_expl + ', and')),
							$elm$html$Html$text('• ' + passage_expl),
							$elm$html$Html$text('In order to be enacted')
						])));
		}
	}
};
var $author$project$Main$raceName = F2(
	function (c_id, meta) {
		var state = $author$project$Contest$fipsToName(meta.fips);
		var special = meta.isSpecial ? ' (Special)' : '';
		var _v0 = meta.office;
		switch (_v0.$) {
			case 'President':
				var _v1 = meta.district;
				if (_v1.$ === 'Just') {
					var district = _v1.a;
					return 'President - ' + (state + (' ' + district));
				} else {
					return 'President - ' + state;
				}
			case 'Senate':
				return 'Senator from ' + (state + special);
			case 'House':
				var _v2 = meta.district;
				if (_v2.$ === 'Just') {
					if (_v2.a === '00') {
						return 'House - ' + state;
					} else {
						var district = _v2.a;
						return 'House - ' + (state + (' ' + district));
					}
				} else {
					return 'House - Unreachable';
				}
			case 'Governor':
				return 'Governor of ' + state;
			case 'StateSenate':
				var _v3 = meta.district;
				if (_v3.$ === 'Just') {
					var district = _v3.a;
					return 'State Senator from District ' + district;
				} else {
					return 'Unreachable';
				}
			case 'StateHouse':
				var _v4 = meta.district;
				if (_v4.$ === 'Just') {
					var district = _v4.a;
					return 'State Representative from District ' + district;
				} else {
					return 'Unreachable';
				}
			default:
				return c_id;
		}
	});
var $author$project$Main$resolveEvs = function (c) {
	var _v0 = c.meta;
	if (_v0.$ === 'Nothing') {
		return 0;
	} else {
		var meta = _v0.a;
		var _v1 = meta.fips;
		switch (_v1) {
			case '01':
				return 9;
			case '02':
				return 3;
			case '04':
				return 11;
			case '05':
				return 6;
			case '06':
				return 55;
			case '08':
				return 9;
			case '09':
				return 7;
			case '10':
				return 3;
			case '11':
				return 3;
			case '12':
				return 29;
			case '13':
				return 16;
			case '15':
				return 4;
			case '16':
				return 4;
			case '17':
				return 20;
			case '18':
				return 11;
			case '19':
				return 6;
			case '20':
				return 6;
			case '21':
				return 8;
			case '22':
				return 8;
			case '23':
				return 4;
			case '24':
				return 10;
			case '25':
				return 11;
			case '26':
				return 16;
			case '27':
				return 10;
			case '28':
				return 6;
			case '29':
				return 10;
			case '30':
				return 3;
			case '31':
				return 5;
			case '32':
				return 6;
			case '33':
				return 4;
			case '34':
				return 14;
			case '35':
				return 3;
			case '36':
				return 29;
			case '37':
				return 15;
			case '38':
				return 3;
			case '39':
				return 18;
			case '40':
				return 7;
			case '41':
				return 7;
			case '42':
				return 20;
			case '44':
				return 4;
			case '45':
				return 9;
			case '46':
				return 3;
			case '47':
				return 11;
			case '48':
				return 38;
			case '49':
				return 6;
			case '50':
				return 3;
			case '51':
				return 13;
			case '53':
				return 12;
			case '54':
				return 5;
			case '55':
				return 10;
			case '56':
				return 3;
			default:
				return 0;
		}
	}
};
var $elm$html$Html$Attributes$rowspan = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rowspan',
		$elm$core$String$fromInt(n));
};
var $author$project$Main$pres = F2(
	function (model, c) {
		var winner = $author$project$Contest$contestWinner(c);
		var total_v = $elm$core$List$sum(
			A2(
				$elm$core$List$map,
				function ($) {
					return $.votes;
				},
				c.results));
		var sorted = $elm$core$List$reverse(
			A2(
				$elm$core$List$sortBy,
				function ($) {
					return $.votes;
				},
				c.results));
		var shade_color = function () {
			if ($author$project$Contest$isReferendum(c)) {
				var _v8 = A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.name;
					},
					winner);
				_v8$2:
				while (true) {
					if (_v8.$ === 'Just') {
						switch (_v8.a) {
							case 'Yes':
								return '#8bc34a';
							case 'No':
								return '#ff9090';
							default:
								break _v8$2;
						}
					} else {
						break _v8$2;
					}
				}
				return '#cccccc';
			} else {
				return 'gold';
			}
		}();
		var party_color = function (cnd) {
			return $author$project$Contest$isReferendum(c) ? $author$project$ShadePalettes$responseColor(cnd.name) : $author$project$ShadePalettes$partyColor(
				A2($elm$core$Maybe$withDefault, 'na', cnd.party));
		};
		var margin = function () {
			if (sorted.b && sorted.b.b) {
				var w = sorted.a;
				var _v7 = sorted.b;
				var s = _v7.a;
				return w.votes - s.votes;
			} else {
				return 0;
			}
		}();
		var isWinner = function (cnd) {
			if (winner.$ === 'Just') {
				var a = winner.a;
				return _Utils_eq(cnd, a);
			} else {
				return false;
			}
		};
		var shade = function (cnd) {
			return isWinner(cnd) ? _List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'background-color', shade_color)
				]) : _List_Nil;
		};
		var footer_left = _Utils_eq(model.office_selected, $author$project$Office$President) ? A2(
			$elm$html$Html$th,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$colspan(2),
					$elm$html$Html$Attributes$rowspan(3)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					function () {
						var _v4 = c.evs;
						if (_v4.$ === 'Just') {
							if (_v4.a === 1) {
								return '1 EV';
							} else {
								var a = _v4.a;
								return $elm$core$String$fromInt(a) + ' EVs';
							}
						} else {
							return $elm$core$String$fromInt(
								$author$project$Main$resolveEvs(c));
						}
					}())
				])) : ($author$project$Office$isReferendum(model.office_selected) ? A2(
			$elm$html$Html$th,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$rowspan(3)
				]),
			_List_Nil) : A2(
			$elm$html$Html$th,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$colspan(2),
					$elm$html$Html$Attributes$rowspan(3)
				]),
			_List_Nil));
		var bq_meta = A2(
			$elm$core$Maybe$andThen,
			$elm$core$Dict$get(c.id),
			model.bq_meta);
		var displayName = function (cnd) {
			if ($author$project$Contest$isReferendum(c)) {
				var tag_maybe = A2(
					$elm$core$Maybe$andThen,
					function () {
						var _v3 = cnd.name;
						switch (_v3) {
							case 'Yes':
								return function ($) {
									return $.yes_tag;
								};
							case 'No':
								return function ($) {
									return $.no_tag;
								};
							default:
								return $elm$core$Basics$always($elm$core$Maybe$Nothing);
						}
					}(),
					bq_meta);
				if (tag_maybe.$ === 'Just') {
					var tag = tag_maybe.a;
					return A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(cnd.name),
								A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										A2($elm$html$Html$Attributes$style, 'font-size', '15px'),
										A2($elm$html$Html$Attributes$style, 'padding-left', '5px')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(tag)
									]))
							]));
				} else {
					return $elm$html$Html$text(cnd.name);
				}
			} else {
				var nm = (model.window_width < 1500) ? cnd.short_name : cnd.name;
				return cnd.isIncumbent ? $elm$html$Html$text(nm + '*') : $elm$html$Html$text(nm);
			}
		};
		var footers = _Utils_ap(
			_List_fromArray(
				[
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							footer_left,
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Total')
								])),
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$DisplayNumber$displayNumber(total_v))
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$Attributes$style,
							'display',
							($elm$core$List$length(sorted) === 1) ? 'none' : 'default')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Margin')
								])),
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$DisplayNumber$displayNumber(margin))
								])),
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									A2($author$project$DisplayNumber$displayPct, margin, total_v))
								]))
						])),
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text('Progress')
								])),
							A2(
							$elm$html$Html$th,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$elm$core$String$fromInt(
										$elm$core$Basics$round(c.progress * 100)) + '%')
								]))
						]))
				]),
			$author$project$Contest$isReferendum(c) ? _List_fromArray(
				[
					A2(
					$elm$html$Html$tr,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$html$Html$td,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$colspan(10),
									A2($elm$html$Html$Attributes$style, 'padding', '10px'),
									A2($elm$html$Html$Attributes$style, 'font-size', '15px')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$map,
									$elm$core$Basics$never,
									A2(
										$elm$core$Maybe$withDefault,
										$elm$html$Html$text('No BQ meta'),
										A2($elm$core$Maybe$map, $author$project$BallotQuestionMeta$passageExplanation, bq_meta)))
								]))
						]))
				]) : _List_Nil);
		var racename = function () {
			var _v0 = c.meta;
			if (_v0.$ === 'Just') {
				var meta = _v0.a;
				if (meta.isReferendum) {
					if (bq_meta.$ === 'Just') {
						var short_summary = bq_meta.a.short_summary;
						var long_summary = bq_meta.a.long_summary;
						return A2(
							$elm$html$Html$div,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									$author$project$Contest$fipsToName(meta.fips) + (' - ' + short_summary)),
									A2($elm$html$Html$br, _List_Nil, _List_Nil),
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											A2($elm$html$Html$Attributes$style, 'font-weight', 'normal'),
											A2($elm$html$Html$Attributes$style, 'padding', '10px')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(long_summary)
										]))
								]));
					} else {
						return $elm$html$Html$text(c.id);
					}
				} else {
					return $elm$html$Html$text(
						A2($author$project$Main$raceName, c.id, meta));
				}
			} else {
				return $elm$html$Html$text(c.id);
			}
		}();
		var raceHeader = A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$th,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$colspan(10)
						]),
					_List_fromArray(
						[racename]))
				]));
		var bordered = _List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'border-bottom-width', 'thin'),
				A2($elm$html$Html$Attributes$style, 'border-bottom-color', 'black'),
				A2($elm$html$Html$Attributes$style, 'border-bottom-style', 'solid'),
				A2($elm$html$Html$Attributes$style, 'padding', '10px')
			]);
		var header = $author$project$Contest$isReferendum(c) ? A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '7px'),
						bordered),
					_List_Nil),
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '200px'),
						bordered),
					_List_fromArray(
						[
							$elm$html$Html$text('Response')
						])),
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '85px'),
						bordered),
					_List_fromArray(
						[
							$elm$html$Html$text('Votes')
						])),
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '20px'),
						bordered),
					_List_fromArray(
						[
							$elm$html$Html$text('Share')
						]))
				])) : A2(
			$elm$html$Html$tr,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '7px'),
						bordered),
					_List_Nil),
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '200px'),
						bordered),
					_List_fromArray(
						[
							$elm$html$Html$text('Candidate')
						])),
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '20px'),
						bordered),
					_List_fromArray(
						[
							$elm$html$Html$text('Party')
						])),
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '85px'),
						bordered),
					_List_fromArray(
						[
							$elm$html$Html$text('Votes')
						])),
					A2(
					$elm$html$Html$th,
					A2(
						$elm$core$List$cons,
						A2($elm$html$Html$Attributes$style, 'width', '20px'),
						bordered),
					_List_fromArray(
						[
							$elm$html$Html$text('Share')
						]))
				]));
		var row = function (cnd) {
			return A2(
				$elm$html$Html$tr,
				shade(cnd),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$td,
						A2(
							$elm$core$List$cons,
							A2(
								$elm$html$Html$Attributes$style,
								'background-color',
								party_color(cnd)),
							bordered),
						_List_Nil),
						A2(
						$elm$html$Html$td,
						bordered,
						_List_fromArray(
							[
								displayName(cnd)
							])),
						$author$project$Contest$isReferendum(c) ? $elm$html$Html$text('') : A2(
						$elm$html$Html$td,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$align('center'),
							bordered),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2(
									$elm$core$String$left,
									3,
									A2($elm$core$Maybe$withDefault, 'na', cnd.party)))
							])),
						A2(
						$elm$html$Html$td,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$align('right'),
							bordered),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$DisplayNumber$displayNumber(cnd.votes))
							])),
						A2(
						$elm$html$Html$td,
						A2(
							$elm$core$List$cons,
							$elm$html$Html$Attributes$align('right'),
							bordered),
						_List_fromArray(
							[
								$elm$html$Html$text(
								A2($author$project$DisplayNumber$displayPct, cnd.votes, total_v))
							]))
					]));
		};
		return A2(
			$elm$html$Html$table,
			_List_fromArray(
				[
					A2($elm$html$Html$Attributes$style, 'border-collapse', 'collapse')
				]),
			_Utils_ap(
				_List_fromArray(
					[raceHeader, header]),
				_Utils_ap(
					A2($elm$core$List$map, row, sorted),
					footers)));
	});
var $author$project$Main$DoCycle = function (a) {
	return {$: 'DoCycle', a: a};
};
var $author$project$Main$JumpToRace = function (a) {
	return {$: 'JumpToRace', a: a};
};
var $elm$svg$Svg$Attributes$dominantBaseline = _VirtualDom_attribute('dominant-baseline');
var $elm$svg$Svg$Attributes$fontSize = _VirtualDom_attribute('font-size');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$html$Html$Events$onMouseOver = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'mouseover',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$svg$Svg$text = $elm$virtual_dom$VirtualDom$text;
var $elm$svg$Svg$Attributes$textAnchor = _VirtualDom_attribute('text-anchor');
var $elm$svg$Svg$text_ = $elm$svg$Svg$trustedNode('text');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Main$statePath = F2(
	function (model, c) {
		var summateDicts = function (dicts) {
			return $elm$core$Dict$fromList(
				A2(
					$elm$core$List$map,
					function (k) {
						return _Utils_Tuple2(
							k,
							$elm$core$List$sum(
								A2(
									$elm$core$List$filterMap,
									function (dict) {
										return A2($elm$core$Dict$get, k, dict);
									},
									dicts)));
					},
					A2($elm$core$List$concatMap, $elm$core$Dict$keys, dicts)));
		};
		var summate_previous = function () {
			var _v4 = c.counties;
			if (_v4.$ === 'Just') {
				var counties = _v4.a;
				return A2(
					$elm$core$List$filterMap,
					$author$project$Contest$pairToCandidate(c.results),
					$elm$core$Dict$toList(
						summateDicts(
							A2(
								$elm$core$List$map,
								function ($) {
									return $.swing_from;
								},
								counties))));
			} else {
				return _List_Nil;
			}
		}();
		var outline = _Utils_eq(
			c.id,
			A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function ($) {
						return $.id;
					},
					$elm$core$List$head(model.data)))) ? '2px' : '0.5px';
		var color = function () {
			var _v3 = model.state_map_showing;
			switch (_v3.$) {
				case 'WinnerShare':
					return $author$project$Contest$isReferendum(c) ? $author$project$Main$questionColorPalette(c.results) : $author$project$Main$partyColorPalette(c.results);
				case 'Swing':
					return $author$project$Contest$isReferendum(c) ? 'lightgray' : $author$project$Main$tpSwingColorPalette(
						A2($author$project$Contest$tpSwing, summate_previous, c.results));
				default:
					return $author$project$ShadePalettes$getMetaShade(c.progress);
			}
		}();
		var _v0 = A2(
			$elm$core$Maybe$andThen,
			$elm$core$Dict$get(c.id),
			model.map_data);
		if (_v0.$ === 'Just') {
			var map_data = _v0.a;
			var _v1 = map_data.geo;
			if (_v1.$ === 'Just') {
				var geo = _v1.a;
				return A2(
					$elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$path,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$d(geo),
									$elm$svg$Svg$Attributes$fill(color),
									$elm$svg$Svg$Attributes$stroke('white'),
									$elm$svg$Svg$Attributes$strokeWidth(outline),
									$elm$svg$Svg$Attributes$id(c.id),
									$elm$html$Html$Events$onMouseOver(
									$author$project$Main$JumpToRace(c.id)),
									$elm$html$Html$Events$onMouseEnter(
									$author$project$Main$DoCycle(false)),
									$elm$html$Html$Events$onMouseLeave(
									$author$project$Main$DoCycle(true))
								]),
							_List_Nil)
						]));
			} else {
				var _v2 = map_data.block;
				var x = _v2.a;
				var y = _v2.b;
				var x1 = x * 75;
				var y1 = y * 75;
				var translation = 'translate(' + ($elm$core$String$fromInt(x1) + (', ' + ($elm$core$String$fromInt(y1) + ')')));
				return A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$transform(translation),
							$elm$svg$Svg$Attributes$width('75px'),
							$elm$svg$Svg$Attributes$height('75px')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$path,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$d('M0,0 L0,75 L75,75 L75,0 Z'),
									$elm$svg$Svg$Attributes$fill(color),
									$elm$svg$Svg$Attributes$stroke('lightgray'),
									$elm$svg$Svg$Attributes$strokeWidth(outline),
									$elm$svg$Svg$Attributes$id(c.id),
									$elm$html$Html$Events$onMouseOver(
									$author$project$Main$JumpToRace(c.id)),
									$elm$html$Html$Events$onMouseEnter(
									$author$project$Main$DoCycle(false)),
									$elm$html$Html$Events$onMouseLeave(
									$author$project$Main$DoCycle(true))
								]),
							_List_Nil),
							A2(
							$elm$svg$Svg$text_,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$x('4%'),
									$elm$svg$Svg$Attributes$y('6%'),
									$elm$svg$Svg$Attributes$dominantBaseline('middle'),
									$elm$svg$Svg$Attributes$textAnchor('middle'),
									$elm$svg$Svg$Attributes$fontSize('30px')
								]),
							_List_fromArray(
								[
									$elm$svg$Svg$text(map_data.abvr)
								]))
						]));
			}
		} else {
			return A2($elm$svg$Svg$g, _List_Nil, _List_Nil);
		}
	});
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $author$project$ViewBox$toString = function (vb) {
	var x = vb.a;
	var y = vb.b;
	var w = vb.c;
	var h = vb.d;
	return A2(
		$elm$core$String$join,
		' ',
		A2(
			$elm$core$List$map,
			$elm$core$String$fromInt,
			_List_fromArray(
				[x, y, w, h])));
};
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $author$project$Main$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				A2($elm$html$Html$Attributes$style, 'padding', '10px')
			]),
		_List_fromArray(
			[
				function () {
				var _v0 = model.err;
				if (_v0.$ === 'Just') {
					var err = _v0.a;
					return A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$author$project$Main$errorToString(err))
							]));
				} else {
					return A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								A2($elm$html$Html$Attributes$style, 'font-family', 'arial')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_Nil,
								_List_fromArray(
									[
										$author$project$Main$nav(model),
										A2($author$project$Main$aggr, model, model.data),
										A2(
										$elm$html$Html$div,
										_List_Nil,
										function () {
											var _v1 = A2(
												$elm$core$List$filter,
												A2(
													$elm$core$Basics$composeL,
													$elm$core$Basics$not,
													$author$project$Main$skipState(model)),
												model.data);
											if (_v1.b) {
												var summary = _v1;
												var x = summary.a;
												var xs = summary.b;
												var fips = A2(
													$elm$core$Maybe$withDefault,
													'00',
													A2(
														$elm$core$Maybe$map,
														function ($) {
															return $.fips;
														},
														x.meta));
												var county_svg = _List_fromArray(
													[
														A3(
														$author$project$Main$displayMapToggleButtons,
														$author$project$Main$mapAUnit(fips),
														$author$project$Main$CountyMapShowing,
														model.county_map_showing),
														A2(
														$elm$svg$Svg$svg,
														_List_fromArray(
															[
																$elm$svg$Svg$Attributes$viewBox('0 0 600 400')
															]),
														_List_fromArray(
															[
																A2($author$project$Main$countyMap, model.county_map_showing, x)
															])),
														A2($author$project$Main$countyTable, x, model.county_selected)
													]);
												var bViewBox = A2(
													$elm$core$List$member,
													model.office_selected,
													_List_fromArray(
														[$author$project$Office$StateSenate, $author$project$Office$StateHouse])) ? A2(
													$author$project$Main$pickViewBox,
													model,
													A2($elm$core$Maybe$withDefault, '', model.filter_state)) : A2($author$project$Main$pickViewBox, model, fips);
												var state_svg = _List_fromArray(
													[
														A3(
														$author$project$Main$displayMapToggleButtons,
														$author$project$Main$mapBUnit(model),
														$author$project$Main$StateMapShowing,
														model.state_map_showing),
														A2(
														$elm$svg$Svg$svg,
														_List_fromArray(
															[
																$elm$svg$Svg$Attributes$viewBox(
																$author$project$ViewBox$toString(bViewBox)),
																_Utils_eq(model.office_selected, $author$project$Office$House) ? A2($elm$html$Html$Attributes$style, 'width', '100%') : A2($elm$html$Html$Attributes$style, 'width', '400px'),
																_Utils_eq(model.office_selected, $author$project$Office$House) ? A2($elm$html$Html$Attributes$style, 'height', '470px') : A2($elm$html$Html$Attributes$style, 'height', '320px')
															]),
														A2(
															$elm$core$List$map,
															$author$project$Main$statePath(model),
															model.data))
													]);
												return _List_fromArray(
													[
														A2($elm$html$Html$br, _List_Nil, _List_Nil),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'display', 'flex')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$div,
																_List_fromArray(
																	[
																		A2($elm$html$Html$Attributes$style, 'height', '55%')
																	]),
																_List_fromArray(
																	[
																		A2($author$project$Main$pres, model, x)
																	])),
																A2(
																$elm$html$Html$div,
																_List_fromArray(
																	[
																		A2($elm$html$Html$Attributes$style, 'width', '35%'),
																		A2($elm$html$Html$Attributes$style, 'padding-left', '10%'),
																		A2($elm$html$Html$Attributes$style, 'padding-right', '10%')
																	]),
																A2(
																	$elm$core$List$member,
																	model.office_selected,
																	_List_fromArray(
																		[$author$project$Office$House, $author$project$Office$StateSenate, $author$project$Office$StateHouse])) ? state_svg : county_svg),
																A2(
																$elm$core$List$member,
																model.office_selected,
																_List_fromArray(
																	[$author$project$Office$StateHouse, $author$project$Office$StateSenate, $author$project$Office$GeorgiaQuestions])) ? A2($elm$html$Html$span, _List_Nil, _List_Nil) : A2(
																$elm$html$Html$div,
																_List_fromArray(
																	[
																		A2($elm$html$Html$Attributes$style, 'overflow-y', 'scroll'),
																		A2($elm$html$Html$Attributes$style, 'height', '130px'),
																		A2($elm$html$Html$Attributes$style, 'width', '20%')
																	]),
																$author$project$Contest$displayCalls(
																	$author$project$Contest$getCalls(summary)))
															])),
														A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'display', 'flex'),
																A2($elm$html$Html$Attributes$style, 'padding', '20px'),
																A2($elm$html$Html$Attributes$style, 'width', '100%')
															]),
														_List_fromArray(
															[
																A2(
																$elm$html$Html$div,
																_List_fromArray(
																	[
																		A2($elm$html$Html$Attributes$style, 'display', 'flex')
																	]),
																A2($author$project$Main$nextInLinup, model, xs))
															])),
														(!$author$project$Office$isReferendum(model.office_selected)) ? A2(
														$elm$html$Html$div,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'display', 'inline-block'),
																A2($elm$html$Html$Attributes$style, 'padding-left', '3px'),
																A2($elm$html$Html$Attributes$style, 'bottom', '15px'),
																A2($elm$html$Html$Attributes$style, 'right', '15px'),
																A2($elm$html$Html$Attributes$style, 'position', 'absolute')
															]),
														_List_fromArray(
															[
																A2(
																$elm$core$List$member,
																model.office_selected,
																_List_fromArray(
																	[$author$project$Office$House, $author$project$Office$StateSenate, $author$project$Office$StateHouse])) ? $author$project$Main$groupList(model) : A2($elm$html$Html$div, _List_Nil, state_svg)
															])) : A2($elm$html$Html$div, _List_Nil, _List_Nil)
													]);
											} else {
												return _List_fromArray(
													[
														A2(
														$elm$html$Html$h2,
														_List_fromArray(
															[
																A2($elm$html$Html$Attributes$style, 'text-align', 'center'),
																A2($elm$html$Html$Attributes$style, 'height', '100%'),
																A2($elm$html$Html$Attributes$style, 'padding-top', '10%')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Awaiting results...')
															]))
													]);
											}
										}())
									]))
							]));
				}
			}()
			]));
};
var $author$project$Main$main = $elm$browser$Browser$document(
	{
		init: $author$project$Main$init,
		subscriptions: $author$project$Main$subscriptions,
		update: $author$project$Main$update,
		view: function (model) {
			return {
				body: _List_fromArray(
					[
						$author$project$Main$view(model)
					]),
				title: 'Election Night 2024'
			};
		}
	});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$int)(0)}});}(this));