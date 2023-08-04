import sympy as sp
import matplotlib.pyplot as plt
import numpy as np

# Step 1: Define the symbolic variable and the function f(x)
x = sp.Symbol('x')
f_x = (sp.cos(5 * sp.pi * x))**(2 * sp.Symbol('n'))

# Step 2: Calculate the limit of the function as n tends to infinity
n = sp.Symbol('n')
f_limit = sp.limit(f_x, n, sp.oo)

# Step 3: Create a function that can be evaluated for any x value
f = sp.lambdify(x, f_limit, 'numpy')

# Step 4: Create an array of x values to plot
x_vals = np.linspace(-1, 1, 1000)

# Step 5: Evaluate f(x) for the given x values
y_vals = f(x_vals)

# Step 6: Plot the function
plt.plot(x_vals, y_vals)
plt.xlabel('x')
plt.ylabel('f(x)')
plt.grid(True)
plt.show()
