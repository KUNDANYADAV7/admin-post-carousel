  // import mongoose from "mongoose";
  // const blogSchema = new mongoose.Schema({
  //   title: {
  //     type: String,
  //     required: true,
  //   },

  //   blogImage: {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   category: {
  //     type: String,
  //     required: true,
  //   },
  //   about: {
  //     type: String,
  //     required: true,
  //     minlength: [200, "Should contain atleast 200 characters!"],
  //   },
  //   adminName: {
  //     type: String,
  //   },
  //   adminPhoto: {
  //     type: String,
  //   },
  //   createdBy: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: "User",
  //   },
  // },  { timestamps: true });
  // export const Blog = mongoose.model("Blog", blogSchema);










  import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    blogImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
      minlength: [200, "Should contain at least 200 characters!"],
    },
    adminName: {
      type: String,
    },
    adminPhoto: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Automatically generate slug before saving the blog
blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Blog = mongoose.model("Blog", blogSchema);
