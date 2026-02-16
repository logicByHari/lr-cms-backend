import { Request, Response } from 'express'
import { Controller, Get, Post, Put, Delete, UseMiddleware } from '@/decorators/index.js'
import {
  loggerMiddleware,
  authMiddleware,
  rateLimitMiddleware,
} from '@/utils/middleware/example-middlewares.js'

/**
 * Example controller showing different @UseMiddleware patterns
 */
@Controller('examples')
export class ExampleController {
  // Example 1: No middleware
  @Get('/public')
  publicRoute(_req: Request, res: Response) {
    return res.json({ message: 'This is a public route' })
  }

  // Example 2: Single middleware
  @Get('/logged')
  @UseMiddleware(loggerMiddleware)
  loggedRoute(_req: Request, res: Response) {
    return res.json({ message: 'This route logs requests' })
  }

  // Example 3: Multiple middlewares (array)
  @Get('/protected')
  @UseMiddleware([authMiddleware, rateLimitMiddleware])
  protectedRoute(_req: Request, res: Response) {
    return res.json({ message: 'This is a protected route' })
  }

  // Example 4: Stacking multiple @UseMiddleware decorators
  @Post('/upload')
  @UseMiddleware(authMiddleware)
  @UseMiddleware(loggerMiddleware)
  // @UseMiddleware(upload.single('file')) // Add multer middleware here
  uploadFile(req: Request, res: Response) {
    // Access uploaded file via req.file (when using multer)
    return res.json({
      message: 'File uploaded',
      // file: req.file,
    })
  }

  // Example 5: Different middlewares for different routes
  @Put('/:id')
  @UseMiddleware([authMiddleware, loggerMiddleware])
  updateItem(req: Request, res: Response) {
    const { id } = req.params
    return res.json({ message: `Updated item ${id}`, body: req.body })
  }

  @Delete('/:id')
  @UseMiddleware(authMiddleware)
  deleteItem(req: Request, res: Response) {
    const { id } = req.params
    return res.json({ message: `Deleted item ${id}` })
  }

  // Example 6: Inline middleware
  @Get('/inline')
  @UseMiddleware((req: Request, res: Response, next) => {
    console.log('Inline middleware executed')
    next()
  })
  inlineMiddleware(_req: Request, res: Response) {
    return res.json({ message: 'Route with inline middleware' })
  }

  // Example 7: Multiple inline middlewares
  @Post('/multi-inline')
  @UseMiddleware([
    (req: Request, res: Response, next) => {
      console.log('First inline middleware')
      next()
    },
    (req: Request, res: Response, next) => {
      console.log('Second inline middleware')
      next()
    },
  ])
  multiInlineMiddleware(_req: Request, res: Response) {
    return res.json({ message: 'Route with multiple inline middlewares' })
  }
}

/**
 * Example 8: Class-level middleware (applies to ALL routes in this controller)
 * Global middlewares run BEFORE route-specific middlewares
 */
@Controller('admin')
@UseMiddleware([authMiddleware, loggerMiddleware]) // Applied to ALL routes
export class AdminController {
  // This route will have: authMiddleware -> loggerMiddleware -> handler
  @Get('/dashboard')
  getDashboard(_req: Request, res: Response) {
    return res.json({ message: 'Admin dashboard' })
  }

  // This route will have: authMiddleware -> loggerMiddleware -> rateLimitMiddleware -> handler
  @Post('/users')
  @UseMiddleware(rateLimitMiddleware) // Additional route-specific middleware
  createUser(_req: Request, res: Response) {
    return res.json({ message: 'User created' })
  }

  // This route will have: authMiddleware -> loggerMiddleware -> handler
  @Delete('/users/:id')
  deleteUser(req: Request, res: Response) {
    const { id } = req.params
    return res.json({ message: `User ${id} deleted` })
  }
}

/**
 * Example: File Upload Controller (requires multer)
 *
 * To use this, install multer:
 * npm install multer @types/multer
 *
 * Then uncomment and use:
 */

/*
import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'))
    }
    cb(null, true)
  },
})

@Controller('files')
export class FileUploadController {
  // Single file upload
  @Post('/single')
  @UseMiddleware([authMiddleware, upload.single('file')])
  uploadSingle(req: Request, res: Response) {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }
    return res.json({
      message: 'File uploaded successfully',
      file: {
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    })
  }

  // Multiple files upload
  @Post('/multiple')
  @UseMiddleware([authMiddleware, upload.array('files', 10)])
  uploadMultiple(req: Request, res: Response) {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }
    return res.json({
      message: 'Files uploaded successfully',
      files: req.files.map((file) => ({
        filename: file.filename,
        size: file.size,
        mimetype: file.mimetype,
      })),
    })
  }

  // Mixed form data with file
  @Post('/mixed')
  @UseMiddleware([authMiddleware, upload.single('avatar')])
  uploadMixed(req: Request, res: Response) {
    return res.json({
      message: 'Form data received',
      file: req.file ? {
        filename: req.file.filename,
        size: req.file.size,
      } : null,
      formData: req.body,
    })
  }
}
*/
