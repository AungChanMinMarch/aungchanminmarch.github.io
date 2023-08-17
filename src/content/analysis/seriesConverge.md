---
author: Aung Chan Min
pubDatetime: 2023-01-30T15:57:52.737Z
title: AstroPaper 2.0
postSlug: seriesConverge
featured: true
description: AstroPaper with the enhancements of Astro v2. Type-safe markdown contents, bug fixes and better dev experience etc.
---

## Convergent Series

A _convergent series_ is a series whose partial sums tend to a specific number, also called _a limit_

## Divergent Series

A _divergent series_ is a series whose partial sums don't approach a limit.

Divergent Series typically go to $\\infty$ or $-\\infty$, don't approach one specific number.

\\frac{1}{2^n}

The partial sums are $s\_N = \\sum\\limits\_{n=1}^{N} \\frac{1}{2^n} = \\frac{\\frac{1}{2}(1-(\\frac{1}{2})^N)}{1-\\frac{1}{2}} = 1 - (\\frac{1}{2})^N$

$$\\Lim\_{N \\to \\infty} s\_N = \\Lim\_{N \\to \\infty} (1-(\\frac{1}{2})^N) =1$$

The series converges and its sum is $1$.

2^n

The partial sums are $s\_N = \\sum\\limits\_{n=1}^{N} 2^N = \\frac{2(2^N-1)}{2-1} = 2(2^N-1)$

$$\\Lim\_{N \\to \\infty} s\_N = \\Lim\_{N \\to \\infty} (2(2^N-1)) = 2((\\Lim\_{N \\to \\infty}2^N)-1) = \\infty$$

The series does not approach specific number. Thus the series diverges
