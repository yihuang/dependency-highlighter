#!/usr/bin/env python
import os
print os.popen('ghc-pkg dot | tred | dot -Tsvg').read()
print '''<script src="jquery.js"></script>
<script src="dotview.js"></script>'''
