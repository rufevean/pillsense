import nbformat
from nbconvert import PythonExporter
import importlib.util
import sys
import os

def import_notebook_function(notebook_path, function_name):
    # Load the notebook
    with open(notebook_path, 'r', encoding='utf-8') as f:
        notebook_content = f.read()

    # Convert the notebook to Python code
    exporter = PythonExporter()
    source_code, _ = exporter.from_notebook_node(nbformat.reads(notebook_content, as_version=4))

    # Create a temporary Python file
    temp_module_name = os.path.splitext(os.path.basename(notebook_path))[0]
    temp_module_path = f"{temp_module_name}.py"
    with open(temp_module_path, 'w', encoding='utf-8') as f:
        f.write(source_code)

    # Import the module
    spec = importlib.util.spec_from_file_location(temp_module_name, temp_module_path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[temp_module_name] = module
    spec.loader.exec_module(module)

    # Get the function
    function = getattr(module, function_name)

    # Clean up the temporary file
    os.remove(temp_module_path)

    return function